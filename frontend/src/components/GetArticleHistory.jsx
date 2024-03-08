import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useForm } from '../store/User';

function GetArticleHistory() {
    // const location = useLocation()
    // const {state} = location || {};
    // console.log("state" , state)
    // const title =  state ? state.title : ""
    // const content = state ? state.content : ""
    const{title , content} = useForm()
    return (
        <>
            <section>
                <h4 className='text-center mt-4 mb-4'>Your saved article</h4>
                <div className='container'>
                    <p>title:{title}</p>
                    <p>content:{content}</p>
                    <NavLink to="/history">
                        <button className='btn btn-primary mt-4 mb-5'>History page</button>
                    </NavLink>
                </div>
            </section>
        </>
    )
}

export default GetArticleHistory;
