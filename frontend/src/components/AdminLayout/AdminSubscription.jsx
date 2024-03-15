import React from 'react'

function AdminSubscription() {
    return (
        <>
            <div className='container m-5'>
                <table className="table table-light table-hover border-1" style={{ border: "1px solid grey", }}>
                    <thead>
                        <tr className='text-center'>
                            <th scope="col" >Email id</th>
                            <th scope="col" >Status</th>
                            <th scope="col" >Plan id</th>
                            <th scope="col" >Amount[199]</th>
                            <th scope="col" >Amount[499]</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    )
}

export default AdminSubscription
