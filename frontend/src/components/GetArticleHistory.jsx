import React from 'react'
import { NavLink } from 'react-router-dom'

function GetArticleHistory() {

    return (
        <>
            <section>
                <h4 className='text-center mt-4'>Your saved article</h4>
                <div className='container'>
                    <table className='article-table mt-4'>
                        <thead>Title</thead>
                        <tbody>Content</tbody>
                        <NavLink to="/history"><button className='btn btn-primary mt-4'>History page</button>
                        </NavLink>
                    </table>
                </div>
            </section>
        </>
    )
}

export default GetArticleHistory
