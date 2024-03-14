import React, { useEffect, useState } from 'react'
import { useForm } from '../../store/User'
import { Link } from 'react-router-dom'

function LanguageLayout() {
    const [language, setLanguage] = useState([])
    const [newLanguage, setNewLanguage] = useState('')
    const { AuthenticationToken } = useForm()

    const handleChange = (e) => {
        setNewLanguage(e.target.value)
    }
    const getLanguage = async () => {
        try {
            const response = await fetch('http://localhost:8083/api/admin/language', {
                method: "GET",
                headers: {
                    Authorization: AuthenticationToken
                },
            })
            const data = await response.json()
            console.log("language", data)
            if (response.ok) {
                setLanguage(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getLanguage()
    }, [])

    const handleClick = async () => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/language/addLanguage`, {
                method: "POST",
                headers: {
                    'Content-type': 'Application/json',
                    Authorization: AuthenticationToken
                },
                body: JSON.stringify({ language: newLanguage })

            })
            const data = await response.json()
            if (response.ok) {
                setLanguage([...language, data.language]);
                setNewLanguage('')
                alert("Language added")
            } else if (response.status === 400) {
                alert('Language already exists')
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteLanguage = async (id) => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/language/deleteLanguage/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: AuthenticationToken
                },
            })
            const data = await response.json()
            alert("Language deleted")
            if (response.ok) {
                getLanguage()
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <section className='w-75'>
                <div className='container mt-5 d-flex'>
                    <div className="mb-4 ">
                        <h6><label className="form-label mt-5 mx-2">Add Language :</label></h6>
                        <div className="input-group">
                            <input
                                name='category'
                                type="text"
                                className="form-control"
                                placeholder="Enter Language"
                                value={newLanguage}
                                onChange={handleChange}
                            />
                            <button className="btn btn-primary" type="button" onClick={handleClick}>Add</button>
                        </div>
                    </div>
                    <div className='container'>
                        <table className="table table-light table-hover border-1 mx-5" style={{ border: "1px solid grey" }}>
                            <thead className='text-center'>
                                <tr>
                                    <th scope="col">Languages</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {
                                    language.map((curData) => {
                                        return (
                                            <>
                                            <tr key={curData._id}>
                                                <td>{curData.Language}</td>
                                                <td>
                                                    <Link onClick={() => deleteLanguage(curData._id)}><i className="fa-solid fa-trash"></i></Link>
                                                </td>
                                            </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LanguageLayout
