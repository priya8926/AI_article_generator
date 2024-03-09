import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useForm } from '../store/User';

function GetArticleHistory() {
    // const location = useLocation()
    // const {state} = location || {};
    // console.log("state" , state)
    // const title =  state ? state.title : ""
    // const content = state ? state.content : ""
    const { title, content } = useForm()
    return (
        <>
            <section className='container'>
                <div className="card container m-5">
                    <div className="card-body">
                        {content ? (
                            <>
                                <h5 className="card-title">title:{title}</h5>
                                <p className="card-text">
                                    content:{content}
                                </p>
                            </>
                        ) : ("Article not available")}<br />
                        <div className='text-center'>

                            <NavLink to="/history">
                                <button className='btn btn-primary mt-3 mb-4'>History page</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default GetArticleHistory;
