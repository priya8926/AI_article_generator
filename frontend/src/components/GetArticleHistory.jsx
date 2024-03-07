import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function GetArticleHistory() {
    const location = useLocation()
    const {state} = location || {};
    console.log("state" , state)
    const title =  state ? state.title : ""
    const content = state ? state.content : ""
    return (
        <>
            <section>
                <h4 className='text-center mt-4'>Your saved article</h4>
                <div className='container'>
                    <p>title:{title}</p>
                    <p>content:{content}</p>
                    <NavLink to="/history">
                        <button className='btn btn-primary mt-4'>History page</button>
                    </NavLink>
                </div>
            </section>
        </>
    )
}

export default GetArticleHistory;