import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Loading from './Loading';
import { saveAs } from 'file-saver';
import { useForm } from '../store/User';
import { NavLink, useNavigate } from 'react-router-dom';


function MainContent() {
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("")
    const { isLoggedIn, AuthenticationToken, paymentId } = useForm();
    const [selectedValues, setSelectedValues] = useState({
        category: '',
        language: '',
        length: '',
    });
    const [promptInput, setPromptInput] = useState("")
    const [clickCount, setClickCount] = useState(0)
    const navigate = useNavigate()
    const handleInputChange = (event, e) => {
        const { name, value } = event.target;
        setSelectedValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleTextChange = (e) => {
        setPromptInput(e.target.value)
    }
    const AISearch = async () => {
        let text = ''
        try {
            setLoading(true)
            const genAI = new GoogleGenerativeAI('AIzaSyDzbRJcMsatyNv9faMhn47BaWAfuw0bGBk');
            const safetySettings = [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
                },
            ];
            const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });
          
            const prompt = `Write a article based on ${selectedValues.category} category in ${selectedValues.language} language and include ${selectedValues.length} words also include ${promptInput} content`;
            const result = await model.generateContent(prompt)
            const response =  result.response;
             text =  response.text();
            // console.log("text", text)
            console.log("passed prompt :  ", prompt)
            console.log(" response ", response)
            setContent(text)
            setLoading(false)

        } catch (error) {
            console.log("error occur while fetchig the api key", error)
        }
    }

    const handleClick = async (e) => {
        e.preventDefault()
        setTitle(selectedValues.category)
        try {
            const countResponse = await fetch("http://localhost:8083/api/search", {
                method: "POST",
                headers: {
                    Authorization: AuthenticationToken,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ paymentId })
            })
            const countData = await countResponse.json()
            if (countResponse.ok) {
                setClickCount(countData.clickCount)
                AISearch()
            }
            else if (countResponse.status === 401) {
                console.log("countdata : ", countData)
                setContent("")
                alert(countData.message)
                return
            }

        } catch (error) {
            console.log(error)
        }
        try {
            const response = await fetch(`http://localhost:8083/api/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: AuthenticationToken,
                },
                body: JSON.stringify(selectedValues)
            })
            if (response.ok) {
                const res_data = await response.json()
                console.log("response from server", res_data)
            }
        }
        catch (error) {
            console.log(error)
        }

    }
    const handleSave = async (event) => {
        event.preventDefault()

        try {
            const contentResponse = await fetch(`http://localhost:8083/api/content`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: AuthenticationToken
                },
                body: JSON.stringify({ content, title })
            })
            if (contentResponse.ok) {
                const data = await contentResponse.json();
                console.log("content from server : ", data)
            }
            const blob = new Blob([content], { type: "text\plain ; charset= utf-8" })
            if (content.length > 0) {
                const save = window.confirm("Do you want to save the article?")
                if (save) {
                    saveAs(blob, "article.txt")
                    alert("article saved!!")
                }
            }
            else {
                alert("Please generate article first")
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (isLoggedIn === false) {
            navigate("/")
        }
    })

    return (
        <>

            <section className='container d-flex justify-content-center' >
                <form >
                    <div className="mb-4 ">
                        <label className="form-label mt-5">
                            Select category for article
                        </label>
                        <div className="dropdown " >
                            <select className="btn btn-secondary" name="category" value={selectedValues.category} onChange={handleInputChange}>
                                <option value="">Select Category</option>
                                <option value="Technology">Technology</option>
                                <option value="Science">Science</option>
                                <option value="Health">Health</option>
                                <option value="Sports">Sports</option>
                                <option value="Business">Business</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label">
                            Select Language for article
                        </label>
                        <div className="dropdown">
                            <select className="btn btn-secondary" name="language" value={selectedValues.language} onChange={handleInputChange} >
                                <option value="">Select Language</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="Hindi">Hindi</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label">
                            Select Length of the article
                        </label>
                        <div className="dropdown">
                            <select className="btn btn-secondary" name="length" value={selectedValues.length} onChange={handleInputChange} >
                                <option value="">Length of the article</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                                <option value="2000">2000</option>
                                <option value="more...">More than 2000...</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label  className="form-label">Enter Title of your article</label><br />
                        <input className="form-control mt-2" name = "promptInput" placeholder="title of your article" aria-label="default input example" value={promptInput} onChange={handleTextChange} />

                    </div>
                    {!selectedValues.category || !selectedValues.language || !selectedValues.length || !promptInput ? (
                        <>
                            <button type="submit" className="btn btn-primary" onClick={handleClick} disabled>
                                Search
                            </button>

                        </>
                    ) : (
                        <button type="submit" className="btn btn-primary" onClick={handleClick}>
                            Search
                        </button>
                    )}
                    {/* <div>
                        <p >You searched the article for {clickCount} times</p>

                    </div> */}

                </form>

            </section>
            <div className=" my-5">
                <div className=' text-center'>
                    <div className="container px-5">
                        <div className="card ">
                            <div className="card-header text-center">
                                {`title of your article ${title}`}
                            </div>
                            <div className="card-body">
                                {/* <h5 className="card-title">Special title treatment</h5> */}
                                <div className="content">
                                    {!selectedValues.category || !selectedValues.language || !selectedValues.length ? (
                                        <div></div>
                                    ) : (
                                        <div className="content">
                                            {loading ? <Loading /> : content}
                                        </div>
                                    )}
                                </div>
                                <div className='my-3'>
                                    <a href="/" className="btn btn-primary" onClick={handleSave}>
                                        save
                                    </a>
                                    {/* <NavLink to="/history" className="btn btn-primary mx-2"
                                        History
                                    </NavLink> */}
                                    <NavLink to='/history'><button className="btn btn-primary mx-2">History</button></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainContent 