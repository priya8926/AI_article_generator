import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Loading from './Loading';
import { saveAs } from 'file-saver';
import { useForm } from '../store/User';
import { NavLink, useNavigate } from 'react-router-dom';
import HeroImg from '../img/feature.png'


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

    const handleInputChange = (event) => {
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

            const prompt = `Write a article based on ${selectedValues.category} category in ${selectedValues.language} language and include ${selectedValues.length} words also contains ${promptInput} content`;

            const result = await model.generateContent(prompt)
            const response = result.response;
            const text = response.text();
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
                body: JSON.stringify({
                    category: selectedValues.category,
                    language: selectedValues.language,
                    length: selectedValues.length,
                    promptInput
                })
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
            const blob = new Blob([content], { type: "text\plain ; charset= utf-8" })
            if (content.length > 0) {
                const save = window.confirm("Do you want to save the article?")
                if (save) {
                    const contentResponse = await fetch(`http://localhost:8083/api/category`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: AuthenticationToken
                        },
                        body: JSON.stringify({  category: selectedValues.category,
                            language: selectedValues.language,
                            length: selectedValues.length,
                            promptInput,title, content })
                    })
                    if (contentResponse.ok) {
                        const data = await contentResponse.json();
                        console.log("content from server : ", data)
                    }
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
<div className="container-fluid pt-5 bg-primary hero-header mb-5">
                    <div className="container pt-5">
                        <div className="row g-5 pt-5">
                            <div className="col-lg-6 align-self-center text-center text-lg-start mb-lg-5">
                                <div className="btn btn-sm border rounded-pill text-white px-3 mb-3 animated slideInRight">
                                    AIArticle
                                </div>
                                <h1 className="display-4 text-white mb-4 animated slideInRight">
                                Welcome to AI Article Generator
                                </h1>
                                <p className="text-white mb-4 animated slideInRight">
                                AI Article Generator is an automatic online tool developed to help those who want to create fresh content for any purpose, whether you need content for your website, SEO , blog, school or college Article Generator can do that for you in few seconds, without any effort.
                                </p>
                               <NavLink
                                    to="/about"
                                    className="btn btn-light py-sm-3 px-sm-5 rounded-pill me-3 animated slideInRight"
                                >
                                    Read More
                                </NavLink>
                                <NavLink
                                    to="/contact"
                                    className="btn btn-outline-light py-sm-3 px-sm-5 rounded-pill animated slideInRight"
                                >
                                    Contact Us
                                </NavLink>
                            </div>
                            <div className="col-lg-6 align-self-end text-center text-lg-end">
                                <img className="img-fluid" src={HeroImg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            <section className='container d-flex justify-content-center' >
                <form >
            <h1 className='container mt-5 text-center'>Write High-Quality Articles in Minutes <br /> with Our AI Article Writer </h1>
                    <div className="mb-4 ">
                        <label className="form-label mt-5 mx-2">
                            Select category for article :
                        </label>
                        <span className="dropdown " >
                            <select className="btn btn-primary selection" name="category" value={selectedValues.category} onChange={handleInputChange}>
                                <option value="">Select Category</option>
                                <option value="Technology">Technology</option>
                                <option value="Science">Science</option>
                                <option value="Health">Health</option>
                                <option value="Sports">Sports</option>
                                <option value="Business">Business</option>
                            </select>
                        </span>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mx-2">
                            Select Language for article : 
                        </label>
                        <span className="dropdown">
                            <select className="btn btn-primary selection" name="language" value={selectedValues.language} onChange={handleInputChange} >
                                <option value="">Select Language</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                                <option value="Hindi">Hindi</option>
                            </select>
                        </span>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mx-2">
                            Select Length of the article :
                        </label>
                        <span className="dropdown">
                            <select className="btn btn-primary selection" name="length" value={selectedValues.length} onChange={handleInputChange} >
                                <option value="">Length of the article</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                                <option value="2000">2000</option>
                                <option value="more...">More than 2000...</option>
                            </select>
                        </span>
                    </div>

                    <div className="mb-4 input-group flex-nowrap">
                        <span className="form-label mx-2 mt-2"> Title of your article :</span>
                        <input className="form-control rounded w-50" name="promptInput" placeholder="Enter title of your article" aria-label="default input example" value={promptInput} onChange={handleTextChange} />

                    </div>
                    <div className='d-flex justify-content-center '>
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
                    </div>
                    {/* <div>
                        <p >You searched the article for {clickCount} times</p>

                    </div> */}

                </form>

            </section>
            <div className=" my-5">
                <div className='text-center'>
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