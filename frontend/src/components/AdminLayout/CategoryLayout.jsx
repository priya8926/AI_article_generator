import React, { useEffect, useRef, useState } from 'react'
import { useForm } from '../../store/User'
import { Link } from 'react-router-dom';

function CategoryLayout() {
    const [category, setCategory] = useState([])
    const [newCategory, setNewCategory] = useState('');
    const [editCat, setEditCat] = useState('')
    const [updateCategoryId, setUpdateCategoryId] = useState(null);
    const { AuthenticationToken } = useForm()
    const ref = useRef(null)
    const refClose = useRef(null)

    const handleChange = (event) => {
        setNewCategory(event.target.value)
    };
    const change = (e) => {
        setEditCat(e.target.value)
    }
    // Get all categories when the component mounts for the first time
    const getCategory = async () => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/category`, {
                method: "GET",
                headers: {
                    Authorization: AuthenticationToken
                },
            })
            if (response.ok) {
                const data = await response.json()
                console.log("category", data)
                setCategory(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getCategory()
    }, [])
    const handleClick = async () => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/category/addcategory`, {
                method: "POST",
                headers: {
                    'Content-type': 'Application/json',
                    Authorization: AuthenticationToken
                },
                body: JSON.stringify({ category: newCategory })
            })
            if (response.ok) {
                const data = await response.json()
                setCategory([...category, data])
                setNewCategory('')
                console.log('category', data)
                alert("category added")
            } else {
                alert("Failed to add category")
            }
        } catch (error) {
            console.log("error adding category", error)
        }
    }
    const deleteCatgory = async (id) => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/category/deletecategory/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: AuthenticationToken
                },
            })
            if (response.ok) {
                getCategory()
                alert("Category deleted")
            } else {
                alert("Failed to delete category")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const updateCategory = (curCategory) => {
        setEditCat(curCategory.category);
        setUpdateCategoryId(curCategory._id)
        ref.current.click()
    }
    const handleUpdate = async () => {
        refClose.current.click()
        try {
            const response = await fetch(`http://localhost:8083/api/admin/category/updatecategory/${updateCategoryId}`,
                {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: AuthenticationToken
                    },
                    body: JSON.stringify({ category: editCat })
                })
            if (response.ok) {
                const data = await response.json()
                // setEditCat(data);
                getCategory();
            } else {
                console.error("Failed to update category");
            }
        }
        catch (error) {
            console.error("Error updating category", error);
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
                            <input type="text" className="form-control" value={editCat} onChange={change} id="exampleFormControlInput1" autoComplete='off'
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
            <section className='d-flex justify-content-center w-75 ' style={{ height: "auto" }}>
                <div className='m-3 w-50'>
                    <div className="mb-4 mx-3">
                        <h6><label className="form-label mt-3">Add Category :</label></h6>
                        <span className="input-group">
                            <input
                                name='category'
                                type="text"
                                className="form-control"
                                placeholder="Enter category"
                                value={newCategory}
                                onChange={handleChange}
                            />
                            <button className="btn btn-primary" type="button" onClick={handleClick} >Add</button>
                        </span>
                    </div>
                    <div className='container h-75' style={{ overflowY: 'scroll' }}>
                        <table className="table table-light table-hover border-1" style={{ border: "1px solid grey" }}>
                            <thead className='text-center'>
                                <tr>
                                    <th scope="col">Categories</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody data-bs-spy="scroll" className="text-center">
                                {
                                    category.map((curData, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td>{curData.category}</td>
                                                    <td>
                                                        <Link onClick={() => updateCategory(curData)}>
                                                            <i className="fa-solid fa-pen-to-square"></i></Link>
                                                    </td>
                                                    <td>
                                                        <Link onClick={() => deleteCatgory(curData._id)}>
                                                            <i className="fa-solid fa-trash"></i></Link>
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

export default CategoryLayout
