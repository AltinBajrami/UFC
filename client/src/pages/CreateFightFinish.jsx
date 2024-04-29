import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'

const CreateFightFinish = () => {

    const { id } = useParams()
    const [finishType, setFinishType] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate()


    const Create = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/v1/fightFinish", { finishType, description })
            .then(result => {
                navigate('/fightFinish')
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Create}>
                    <h2>Create Finish</h2>
                    <div className='mb-2'>
                        <label htmlFor="">FinishType</label>
                        <input type="text" placeholder="Enter FinishType" className="form-control"
                            value={finishType} onChange={(e) => setFinishType(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Description</label>
                        <input type="text" placeholder="Enter Description" className="form-control"
                            value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <button className="btn btn-success">Update</button>
                </form>
            </div>
        </div>
    )
}


export default CreateFightFinish