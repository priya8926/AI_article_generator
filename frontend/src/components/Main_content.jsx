import React, { useEffect, useState } from 'react'
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Loading from './Loading';
import { saveAs } from 'file-saver';

function MainContent() {
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("Title of your article")
    const [selectedValues, setSelectedValues] = useState({
        category: '',
        language: '',
        length: ''
    });
    const [click, setClick] = useState(1)

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

            const prompt = `Write a article based on ${selectedValues.category} category in ${selectedValues.language} language and include ${selectedValues.length} words`;
            const result = await model.generateContent(prompt)
            const response = await result.response;
            const text = await response.text();
            // console.log("text", text)
            console.log("passed prompt :  ", prompt)
            console.log(" response ", response)
            setContent(text)
            setLoading(false)

        } catch (error) {
            console.log("error occur while fetchid the api key", error)
        }
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSelectedValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault()
        if (selectedValues.category) {
            setTitle(`Article based on ${selectedValues.category}`)
        }
        try {
            const response = await fetch(`http://localhost:8083/api/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(selectedValues)
            })
            if (response.ok) {
                const res_data = await response.json()
                console.log("response from server", res_data)
                setClick(res_data.count)
            }
            else if (response.status === 400) {
                const data = await response.json();
                alert(data.message);
            } else {
                console.error("Error:", response.statusText);
                AISearch()
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
                    "Content-Type": "application/json"
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
                    {!selectedValues.category || !selectedValues.language || !selectedValues.length ? (
                        <button type="submit" className="btn btn-primary" onClick={handleClick} disabled>
                            Search
                        </button>
                    ) : (
                        <button type="submit" className="btn btn-primary" onClick={handleClick}>
                            Search
                        </button>
                    )}

                </form>

            </section>
            <div className=" my-5">
                <div className=' text-center'>
                    <div className="container px-5">
                        <div className="card ">
                            <div className="card-header text-center">
                                {title}
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