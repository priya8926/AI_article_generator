import React, { useEffect, useRef, useState } from 'react'
import { useForm } from '../../store/User'
import { Link } from 'react-router-dom'

function LengthLayout() {
    const [length, setLength] = useState([])
    const [newLength, setnewLength] = useState('')
    const [editLength, setEditLength] = useState('')
    const [updatelengthId, setUpdateLengthId] = useState(null)
    const { AuthenticationToken } = useForm()
    const ref = useRef(null)
    const refClose = useRef(null)

    const handleChange = (event) => {
        setnewLength(event.target.value)
    }
    const change = (event) => {
        setEditLength(event.target.value)
    }
    const getLength = async () => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/length`, {
                method: "GET",
                headers: {
                    'Content-type': 'Application/json',
                    Authorization: AuthenticationToken
                },
            })
            if (response.ok) {
                const data = await response.json()
                setLength(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getLength()
    }, [])
    const addLength = async () => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/length/addLength`, {
                method: "POST",
                headers: {
                    'Content-type': 'Application/json',
                    Authorization: AuthenticationToken
                },
                body: JSON.stringify({ length: newLength })
            })
            const data = await response.json()
            if (response.ok) {
                setLength([...length, data])
                setnewLength("")
                alert("Length added")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteLength = async (id) => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/length/deleteLength/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: AuthenticationToken
                }
            })
            if (response.ok) {
                const data = await response.json()
                getLength()
                alert("Length deleted ")
            }
        } catch (error) {
            console.log(error)

        }
    }
    const updateLength = (curlength) => {
        setEditLength(curlength.length)
        setUpdateLengthId(curlength._id)
        ref.current.click()
    }
    const handleUpdate = async () => {
        refClose.current.click();
        try {
            const response = await fetch(`http://localhost:8083/api/admin/length/updateLength/${updatelengthId}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: AuthenticationToken
                },
                body: JSON.stringify({ length: editLength })
            })
            if (response.ok) {
                getLength()
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
                            <input type="text" className="form-control" value={editLength} onChange={change} id="exampleFormControlInput1" autoComplete='off'
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
                        <h6><label className="form-label mt-3">Add Length : </label></h6>
                        <div className="input-group">
                            <input
                                name='length'
                                type="text"
                                className="form-control"
                                placeholder="Enter category"
                                value={newLength}
                                onChange={handleChange}
                            />
                            <button className="btn btn-primary" type="button" onClick={addLength}>Add</button>
                        </div>
                    </div>
                    <div className='container h-50' style={{overflowY: 'scroll' }}>
                        <table className="table table-light table-hover border-1" style={{ border: "1px solid grey" }}>
                            <thead className='text-center'>
                                <tr>
                                    <th scope="col">Length</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody className="text-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {
                                    length.map((curData, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td>{curData.length}</td>
                                                    <td>
                                                        <Link onClick={() => updateLength(curData)}>
                                                            <i className="fa-solid fa-pen-to-square"></i></Link>
                                                    </td>
                                                    <td>
                                                        <Link onClick={() => deleteLength(curData._id)}><i className="fa-solid fa-trash"></i></Link>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    }
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LengthLayout
