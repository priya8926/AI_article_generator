import React, { useEffect, useState } from 'react'
import { useForm } from '../../store/User'
import { Link } from 'react-router-dom';

function CategoryLayout() {
    const [category, setCategory] = useState([])
    const [newCategory, setNewCategory] = useState('');
    const { AuthenticationToken } = useForm()

    const handleChange = (event) => {
        setNewCategory(event.target.value)
    };
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
            const data = await response.json()
            alert("Category deleted")
            if (response.ok) {
                getCategory()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const editCateory = async (id) => {
        try {
            const response = await fetch(`http://localhost:8083/api/admin/category/updatecategory/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: AuthenticationToken
                },
                body: JSON.stringify({ updateCat })
            })
            if (response.ok) {
                const data = await response.json()
                setUpdateCat(data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <section className='w-75'>
                <div className=' mt-5 d-flex px-5'>
                    <div className="mb-4 mx-3">
                        <h6><label className="form-label mt-5 mx-2">Add Category :</label></h6>
                        <div className="input-group">
                            <input
                                name='category'
                                type="text"
                                className="form-control"
                                placeholder="Enter category"
                                value={newCategory}
                                onChange={handleChange}
                            />
                            <button className="btn btn-primary" type="button" onClick={handleClick} >Add</button>
                        </div>
                    </div>
                    <div className='container'>
                        <table className="table table-light table-hover border-1" style={{ border: "1px solid grey" }}>
                            <thead className='text-center'>
                                <tr>
                                    <th scope="col">Categories</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {
                                    category.map((curData, index) => {
                                        return (
                                            <>
                                                <tr key={index}>
                                                    <td>{curData.category}</td>
                                                    <td>
                                                        <Link onClick={() => deleteCatgory(curData._id)}>
                                                            <i className="fa-solid fa-trash"></i></Link>
                                                    </td>
                                                    <td>
                                                        <Link onClick={() => editCateory(curData._id)}>
                                                            <i className="fa-solid fa-pen-to-square"></i></Link>
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
