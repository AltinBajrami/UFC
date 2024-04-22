import React, { useState, useEffect } from 'react'
import customFetch from '../../utils'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Fighters = () => {
    const [fighters, setFighters] = useState([])

    useEffect(() => {
        customFetch.get('/fighters', { withCredentials: true })
            .then(result => {
                setFighters(result.data.fighters)
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        customFetch.delete('/fighters/' + id)
            .then(res => {
                toast.success('Deleted figher')
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-100 bg-white rounded p-3'>
                <Link to="/fighters/create" className='btn btn-success'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>FighterName</th>
                            <th>NickName</th>
                            <th>HomeTown</th>
                            <th>Status</th>
                            <th>FightingStyle</th>
                            <th>Gender</th>
                            <th>Country</th>
                            <th>weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            fighters.map((fighter, index) => {
                                return <tr key={index}>
                                    <td>{fighter.fighterName}</td>
                                    <td>{fighter.nickName}</td>
                                    <td>{fighter.homeTown}</td>
                                    <td>{fighter.status}</td>
                                    <td>{fighter.fightingStyle}</td>
                                    <td>{fighter.gender}</td>
                                    <td>{fighter.country}</td>
                                    <td>{fighter?.weightClass?.className}</td>
                                    <td>
                                        <Link to={`/fighters/update/${fighter._id}`} className='btn btn-success'>Update</Link>
                                        <button className='btn btn-danger'
                                            onClick={(e) => handleDelete(fighter._id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Fighters