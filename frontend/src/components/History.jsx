import React, { useEffect, useState } from 'react'

function History() {
    const [history, setHistory] = useState([])

    const getArticle = async () => {
        try {
            const response = await fetch('http://localhost:8083/api/getCategory');
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
    useEffect(() => {
        getArticle()
    }, [])
    return (
        <>
            <section className='container history_section'>
                <p className='mt-3'>Today</p>
                <table className='history_table'>
                    <thead>
                        <tr>
                            <th>category </th>
                            <th>language </th>
                            <th>length </th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className='history-tbody'>
                        {
                            history.map((curData, index) => {
                                return (
                                    <>
                                    <tr key={index}>
                                        <td>{curData.category}</td>
                                        <td>{curData.language}</td>
                                        <td>{curData.length} </td>
                                        <td>
                                            <a href='#'>Delete article </a>
                                        </td>
                                        <td>
                                            <a href='#'>Show article </a>
                                        </td>
                                    </tr>
                                    </>
                                )
                            })
                        }

                    </tbody>
                </table>
                <p className='mt-3'>Yesterday</p>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                        </tr>
                        <tr>hii</tr>
                        <tr>hii</tr>
                        <tr>hii</tr>
                        <tr>hii</tr>
                        <tr>hii</tr>
                    </thead>
                </table>
                <p className='mt-3'>Last week</p>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                        </tr>
                        <tr>hii</tr>
                        <tr>hii</tr>
                        <tr>hii</tr>
                        <tr>hii</tr>
                        <tr>hii</tr>
                    </thead>
                </table>
            </section>
        </>
    )
}

export default History
