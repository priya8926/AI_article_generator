import React from 'react'
import { useForm } from '../../store/User'

function CategoryLayout() {
    const { categories, value, addCategory, setValue } = useForm()

    const handleNewCategoryChange = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        });
    };
    return (
        <>
            <section>
                <div className='container mt-5'>
                    <div className="mb-4 mx-3">
                        <label className="form-label mt-5 mx-2">Add Category</label>
                        <div className="input-group">
                            <input
                                name='category'
                                type="text"
                                className="form-control"
                                placeholder="Enter category"
                                value={value.category}
                                onChange={handleNewCategoryChange}
                            />
                            <button className="btn btn-primary" type="button" onClick={addCategory}>Add</button>
                        </div>
                    </div>
                    <div className='container'>
                        <table className="table table-light table-hover border-1" style={{ border: "1px solid grey" }}>
                            <thead className='text-center'>
                                <tr>
                                    <th scope="col">Categories</th>
                                </tr>
                            </thead>
                            <tbody className="text-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

        </>
    )
}

export default CategoryLayout
