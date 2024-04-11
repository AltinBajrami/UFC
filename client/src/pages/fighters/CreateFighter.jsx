import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import customFetch from "../../utils";
import { toast } from 'react-toastify'

const CreateFighter = () => {
    const [fighterName, setFighterName] = useState()
    const [nickName, setNickName] = useState()
    const [homeTown, setHomeTown] = useState()
    const [reach, setReach] = useState()
    const [legReach, setLegReach] = useState()
    const [status, setStatus] = useState('active')
    const [fightingStyle, setFightingStyle] = useState()
    const [fighterImage, setFighterImage] = useState(null)
    const [gender, setGender] = useState('male')
    const [country, setCountry] = useState()
    const [weightClass, setWeightClass] = useState(null);
    const [weightClasses, setWeightClasses] = useState([]);

    const navigate = useNavigate()

    const getAllWeightClasses = async () => {
        try {
            const { data } = await customFetch('/weightClasses', { withCredentials: true });
            setWeightClasses(data?.weightClasses)
            setWeightClass(data?.weightClasses[0]?._id)
        } catch (error) {
            setWeightClasses([]);
        }
    }

    useEffect(() => {
        getAllWeightClasses()
    }, [])

    const Submit = async (e) => {
        e.preventDefault();
        console.log(fighterName,
            nickName,
            country,
            gender,
            fightingStyle,
            status,
            reach,
            legReach,
            homeTown,
        );
        console.log(e);
        try {
            const formData = new FormData();
            formData.append('fighterName', fighterName);
            formData.append('nickName', nickName);
            formData.append('homeTown', homeTown);
            formData.append('reach', reach);
            formData.append('legReach', legReach);
            formData.append('status', status);
            formData.append('fightingStyle', fightingStyle);
            formData.append('fighterImage', fighterImage);
            formData.append('gender', gender);
            formData.append('country', country);
            formData.append('weightClass', weightClass);

            const { data } = await customFetch.post("/fighters", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            // Redirect after successful submission
            navigate('/fighters');
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            console.log(error);
            return error;
        }
    }

    return (
        <div className="d-flex vh-50 bg-primary justify-content-center align-items-center p-5">
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Submit} encType="multipart/form-data">
                    <h2>Add User</h2>
                    <div className='mb-2'>
                        <label htmlFor="">FighterName</label>
                        <input type="text" placeholder='Enter FighterName' required className='form-control'
                            onChange={(e) => setFighterName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">NickName</label>
                        <input type="text" placeholder='Enter NickName' required className='form-control'
                            onChange={(e) => setNickName(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">HomeTown</label>
                        <input type="text" placeholder='Enter HomeTown' required className='form-control'
                            onChange={(e) => setHomeTown(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Reach</label>
                        <input type="text" placeholder='Enter Reach' required className='form-control'
                            onChange={(e) => setReach(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">LegReach</label>
                        <input type="text" placeholder='Enter LegReach' required className='form-control'
                            onChange={(e) => setLegReach(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Status</label>
                        <input type="text" placeholder='Enter Status' className='form-control'
                            value={status} onChange={(e) => setStatus(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">FightingStyle</label>
                        <input type="text" placeholder='Enter FightingStyle' required className='form-control'
                            onChange={(e) => setFightingStyle(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Gender</label>
                        <input type="text" placeholder='Enter Gender' required className='form-control'
                            value={gender} onChange={(e) => setGender(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Country</label>
                        <input type="text" placeholder='Enter Country' required className='form-control'
                            onChange={(e) => setCountry(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Image</label>
                        <input type="file" name="fighterImage" onChange={(e) => setFighterImage(e.target.files[0])} className='form-control'
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
                    <button type="submit" className='btn btn-success'>Submit</button>

                </form>

            </div>
        </div>
    )
}

export default CreateFighter