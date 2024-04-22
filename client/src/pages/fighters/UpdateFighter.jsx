import React, { useState, useEffect } from "react";
import { useParams, useNavigate, redirect } from "react-router-dom";
import customFetch from "../../utils";
import { toast } from 'react-toastify'

const UpdateFighter = () => {

    const { id } = useParams()

    const [fighterName, setFighterName] = useState('')
    const [nickName, setNickName] = useState('')
    const [homeTown, setHomeTown] = useState('')
    const [reach, setReach] = useState('')
    const [legReach, setLegReach] = useState('')
    const [age, setAge] = useState('32')
    const [status, setStatus] = useState('')
    const [fightingStyle, setFightingStyle] = useState('')
    const [fighterImage1, setFighterImage1] = useState(null)
    const [fighterImage2, setFighterImage2] = useState(null)
    const [gender, setGender] = useState('')
    const [country, setCountry] = useState('')
    const [weightClass, setWeightClass] = useState(null);
    const [weightClasses, setWeightClasses] = useState([]);
    const navigate = useNavigate()

    const getAllWeightClasses = async () => {
        try {
            const { data } = await customFetch('/weightClasses', { withCredentials: true });
            setWeightClasses(data?.weightClasses)
        } catch (error) {
            setWeightClasses([]);
        }
    }

    const getFighter = async () => {
        const response = await customFetch.get('/fighters/' + id, { withCredentials: true, });
        const { fighterName, nickName, homeTown, reach, legReach,
            status, fightingStyle, gender, country, weightClass, age } = response.data.fighter;
        setFighterName(fighterName)
        setNickName(nickName)
        setHomeTown(homeTown)
        setReach(reach)
        setLegReach(legReach)
        setStatus(status)
        setFightingStyle(fightingStyle)
        setGender(gender)
        setCountry(country)
        setWeightClass(weightClass?._id);
        setAge(age)
    }
    useEffect(() => {
        getFighter()
        getAllWeightClasses();
    }, [id])

    const Update = async (e) => {
        e.preventDefault();
        customFetch.patch("/fighters/" + id, {
            fighterName, nickName,
            homeTown, reach, legReach, status, fightingStyle, gender, country,
            fighterImage1, weightClass, age, fighterImage2
        }, {
            withCredentials: true, headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            toast.success('Updated successfully')
            navigate('/fighters')
        }).catch((err) => toast.error(err?.response?.data?.msg))
    }
    return (
        <div className="d-flex vh-50 bg-primary justify-content-center align-items-center p-5">
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Update Fighter</h2>
                    <div className='mb-2'>
                        <label htmlFor="">FighterName</label>
                        <input type="text" placeholder='Enter FighterName' className='form-control'
                            value={fighterName} onChange={(e) => setFighterName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">NickName</label>
                        <input type="text" placeholder='Enter NickName' className='form-control'
                            value={nickName} onChange={(e) => setNickName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">HomeTown</label>
                        <input type="text" placeholder='Enter HomeTown' className='form-control'
                            value={homeTown} onChange={(e) => setHomeTown(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Reach</label>
                        <input type="text" placeholder='Enter Reach' className='form-control'
                            value={reach} onChange={(e) => setReach(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">LegReach</label>
                        <input type="text" placeholder='Enter LegReach' className='form-control'
                            value={legReach} onChange={(e) => setLegReach(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Age</label>
                        <input type="number" placeholder='Enter Age' className='form-control'
                            value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Status</label>
                        <input type="text" placeholder='Enter Status' className='form-control'
                            value={status} onChange={(e) => setStatus(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">FightingStyle</label>
                        <input type="text" placeholder='Enter FightingStyle' className='form-control'
                            value={fightingStyle} onChange={(e) => setFightingStyle(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Gender</label>
                        <input type="text" placeholder='Enter Gender' className='form-control'
                            value={gender} onChange={(e) => setGender(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Country</label>
                        <input type="text" placeholder='Enter Country' className='form-control'
                            value={country} onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">First Image</label>
                        <input type="file" name="fighterImage1" onChange={(e) => setFighterImage1(e.target.files[0])} className='form-control'
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Second Image</label>
                        <input type="file" name="fighterImage2" onChange={(e) => setFighterImage2(e.target.files[0])} className='form-control'
                        />
                    </div>
                    <div className='mb-2'>
                        <select name="weightClass" value={weightClass || 'default'} className="form-select" onChange={(e) => setWeightClass(e.target.value)} id="">
                            {weightClasses.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.className}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className='btn btn-success'>Update</button>

                </form>

            </div>
        </div>
    )
}

export default UpdateFighter