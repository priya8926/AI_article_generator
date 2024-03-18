import React, { useEffect, useRef, useState } from 'react'
import { useForm } from '../../store/User'
import { Link } from 'react-router-dom'

function LanguageLayout() {
    const [language, setLanguage] = useState([])
    const [newLanguage, setNewLanguage] = useState('')
    const [editLang, setEditLang] = useState('')
    const [updateLanguageId, setUpdateLanguageId] = useState(null)
    const { AuthenticationToken } = useForm()
    const ref = useRef(null)
    const refClose = useRef(null)

    const handleChange = (e) => {
        setNewLanguage(e.target.value)
    }
    const change = (e) => {
        setEditLang(e.target.value);
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
            if (response.ok) {
                const data = await response.json()
                console.log("hiiii", data.language)
                setLanguage([...language, data]);
                setNewLanguage('')
                alert("Language added")
            } else if (response.status === 400) {
                alert('Language already exists')
            } else {
                alert("Failed to add category")
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
            if (response.ok) {
                alert("Language deleted")
                getLanguage()
            } else {
                alert("Failed to delete category")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateLanguage = (curLanguage) => {
        setEditLang(curLanguage.language);
        setUpdateLanguageId(curLanguage._id)
        ref.current.click()
    }
    const handleUpdate = async () => {
        refClose.current.click();
        try {
            const response = await fetch(`http://localhost:8083/api/admin/language/updateLanguage/${updateLanguageId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: AuthenticationToken
                },
                body: JSON.stringify({ language: editLang })
            })
            if (response.ok) {
                getLanguage()
            } else {
                console.error("Failed to update language");
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <button
                ref={ref}
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Open Modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex={-1}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title">Update category</h6>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"

                            ></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="form-control" value={editLang} onChange={change} id="exampleFormControlInput1" autoComplete='off'
                            />

                        </div>
                        <div className="modal-footer">
                            <button
                                ref={refClose}
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button onClick={handleUpdate} type="button" className="btn btn-primary">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <section className='d-flex justify-content-center w-75'>
                <div className='m-3 w-50'>
                    <div className="mb-4 mx-3">
                        <h6><label className="form-label mt-3">Add Language :</label></h6>
                        <div className="input-group">
                            <input
                                name='language'
                                type="text"
                                className="form-control"
                                placeholder="Enter Language"
                                value={newLanguage}
                                onChange={handleChange}
                            />
                            <button className="btn btn-primary" type="button" onClick={handleClick}>Add</button>
                        </div>
                    </div>
                    <div className='container h-75' style={{ overflowY: 'scroll' }}>
                        <table className="table table-light table-hover border-1 " style={{ border: "1px solid grey" }}>
                            <thead className='text-center'>
                                <tr>
                                    <th scope="col">Languages</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody className="text-center" style={{overflowY: 'auto' }}>
                                {
                                    language.map((curData, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td>{curData.language}</td>
                                                    <td>
                                                        <Link onClick={() => updateLanguage(curData)}>
                                                            <i className="fa-solid fa-pen-to-square"></i></Link>
                                                    </td>
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
