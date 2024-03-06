import React, { useEffect, useState } from 'react'
import { useForm } from '../store/User';
import { Link, NavLink } from 'react-router-dom';

function History() {
    const [history, setHistory] = useState([])
    const [content, setContent] = useState([])
    const { AuthenticationToken } = useForm()
    const getArticle = async () => {
        try {
            const response = await fetch('http://localhost:8083/api/getCategory', {
                method: "GET",
                headers: {
                    Authorization: AuthenticationToken
                }
            });
            if (response.ok) {
                const data = await response.json();
                setHistory(data); // Update history state with fetched data
            } else {
                console.error('Failed to fetch article data');
            }
        } catch (error) {
            console.log("error fetching article")
        }
    }
    const showArticle = async (id) => {
        try {
            const response = await fetch(`http://localhost:8083/api/getarticle/${id}`, {
                method: "GET",
                headers: {
                    Authorization: AuthenticationToken
                }
            })
            if (response.ok) {
                const data = await response.json()
                setContent(data)
                console.log("set content ", setContent)
            }
        } catch (error) {
            console.log("error fetching content of the aerticle")
        }
    }
    useEffect(() => {
        getArticle()
    }, [])
    return (
        <>
            <section className='container history_section mt-5'>
                <h4 className='text-center'>History of your article</h4>
                <div className="history mt-3">
                    <table className='history_table'>
                        <thead >
                            <tr>
                                <th>category </th>
                                <th>language </th>
                                <th>length </th>
                                <th>Searched text</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='history-tbody '>
                            {
                                history.map((curData, index) => {
                                    return (
                                        <>
                                            <tr key={index}>
                                                <td>{curData.category}</td>
                                                <td>{curData.language}</td>
                                                <td>{curData.length} </td>
                                                <td>{curData.promptInput} </td>
                                                <td>
                                                    <Link to={`/getarticle/${curData._id}`} onClick={() => showArticle(curData._id)}>Show article</Link>

                                                </td>

                                                <td>
                                                    <a href='#'>Delete article </a>
                                                </td>

                                            </tr>
                                        </>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                    <div>
                        <NavLink to="/home"><button className='btn btn-primary mt-4'>Goto Home Page</button></NavLink>
                    </div>
                </div>
            </section>
        </>
    )
}

export default History
