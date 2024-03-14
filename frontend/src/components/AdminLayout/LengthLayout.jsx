import React, { useEffect, useState } from 'react'
import { useForm } from '../../store/User'
import { Link } from 'react-router-dom'

function LengthLayout() {
    const { AuthenticationToken } = useForm()
    const [length, setLength] = useState([])
    const [newLength, setnewLength] = useState('')

    const handleChange = (e) => {
        setnewLength(e.target.value)
    }
    const getLength = async()=>{
        try {
            const response = await fetch(`http://localhost:8083/api/admin/length`,{
                method: "GET",
                headers: {
                    'Content-type': 'Application/json',
                    Authorization: AuthenticationToken
                },
            })
            if(response.ok){
                const data = await response.json()
                setLength(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getLength()
    },[])
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
            console.log("length" , data)
            if (response.ok) {
                setLength([...length, data])
                setnewLength("")
                alert("Length added")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteLength = async(id)=>{
        try {
            const response = await fetch(`http://localhost:8083/api/admin/length/deleteLength/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization : AuthenticationToken
                }
            })
            if(response.ok){
                const data = await response.json()
                getLength()
                alert("Length deleted ")
            }
        } catch (error) {
            console.log(error)
            
        }
    }
    return (
        <>
            <section className='w-50 '>
                <div className='container mt-5 d-flex w-100 justify-content-around mx-5'>
                    <div className="mb-4">
                      <h6><label className="form-label mt-5 mx-2">Add Length</label></h6>  
                        <div className="input-group">
                            <input
                                name='category'
                                type="text"
                                className="form-control"
                                placeholder="Enter category"
                                value={newLength}
                                onChange={handleChange}
                            />
                            <button className="btn btn-primary" type="button" onClick={addLength}>Add</button>
                        </div>
                    </div>
                    <div className='container'>
                        <table className="table table-light table-hover border-1 mx-5" style={{ border: "1px solid grey" }}>
                            <thead className='text-center'>
                                <tr>
                                    <th scope="col">Length</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="text-center" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                {
                                    length.map((curData, index) => {
                                        return (
                                            <>
                                            <tr key={index}>
                                                <td>{curData.Length}</td>
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
