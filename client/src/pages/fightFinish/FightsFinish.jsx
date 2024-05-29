import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from 'styled-components'


const FightsFinish = () => {

    const [finishs, setFinishs] = useState([])

    const getAllFightFinishes = async (url) => {
        try {
            const response = await axios.get(url);
            setFinishs(response.data.fightFinishs);
        } catch (error) {

        }
    }

    useEffect(() => {

        getAllFightFinishes('http://localhost:5000/api/v1/fightFinish')
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:5000/api/v1/fightFinish/' + id)
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/fightFinish/create" className='btn btn-success'>Add </Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>FinishType</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            finishs.map((finish, index) => {
                                return <tr key={index}>
                                    <td>{finish.finishType}</td>
                                    <td>{finish.description}</td>
                                    <td>
                                        <Link to={`/fightFinish/update/${finish._id}`} className='btn btn-success'>Update </Link>
                                        <button className='btn btn-danger'
                                            onClick={(e) => handleDelete(finish._id)}>Delete</button>

                                    </td>
                                </tr>
                            })
                        }

                    </tbody>

                </table>

            </div>

        </div>
    )
}

const Wrapper = styled.div`
    
`

export default FightsFinish