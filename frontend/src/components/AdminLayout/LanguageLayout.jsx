import React from 'react'

function LanguageLayout() {
  return (
    <>
      <section>
                <div className='container mt-5'>
                    <div className="mb-4 mx-3">
                        <label className="form-label mt-5 mx-2">Add Language</label>
                        <div className="input-group">
                            <input
                                name='category'
                                type="text"
                                className="form-control"
                                placeholder="Enter category"
                            />
                            <button className="btn btn-primary" type="button" onClick={addLanguage}>Add</button>
                        </div>
                    </div>
                    <div className='container'>
                        <table className="table table-light table-hover border-1" style={{ border: "1px solid grey" }}>
                            <thead className='text-center'>
                                <tr>
                                    <th scope="col">Languages</th>
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

export default LanguageLayout
