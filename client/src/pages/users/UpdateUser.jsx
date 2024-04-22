import React, { useEffect, useState } from 'react'
import customFetch from '../../utils';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

const singleUserQuery = (id) => {
    return {
        queryKey: ['user', id],
        queryFn: async () => {
            const response = await customFetch.get(`/users/${id}`, { withCredentials: true });
            return response.data;
        }
    }
}

const UpdateUser = () => {
    const { id } = useParams()
    const [updateUser, setUpdateUser] = useState({
        firstName: '', lastName: '', email: '', country: '', profileImage: null
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(true);
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const getUser = async (id) => {
        try {
            const response = await customFetch.get('/users/' + id, { withCredentials: true })
            const user = response?.data?.user;
            setUpdateUser({ ...user });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false)
            setIsError(true)
        }
    }

    const { mutate: updateUserFn, error, isError: isUpdateError } = useMutation({
        mutationFn: async (user) => await customFetch.patch('/users/updateUser', { ...user }, {
            withCredentials: true, headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            toast.success('Updated!');
            navigate('/profile');
        },
        onError: (error) => {
            toast.error(error.response.data.msg);
        },
    });

    useEffect(() => {
        getUser(id);
    }, [id])

    if (isLoading) {
        return <div style={{ textAlign: 'center', marginTop: '5rem' }} className='loading'></div>
    }
    if (isError || isUpdateError) {
        toast.error(error?.response?.data?.msg);
    }

    const handleChange = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        updateUserFn(updateUser)
    }


    return (
        <form className='form' method='post' onSubmit={handleSubmit}>
            <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }}>Update</h2>
            <div className="form-row">
                <label id='firstName' htmlFor="firstName" className='form-label'  >First Name</label>
                <input type="text" name='firstName' className='form-input' required value={updateUser.firstName} onChange={handleChange} />
            </div>
            <div className="form-row">
                <label id='lastName' htmlFor="lastName" className='form-label'>Last Name</label>
                <input type="text" name='lastName' className='form-input' required value={updateUser.lastName} onChange={handleChange} />
            </div>
            <div className="form-row">
                <label id='email' htmlFor="email" className='form-label'>email</label>
                <input type="email" name='email' className='form-input' required value={updateUser.email} onChange={handleChange} />
            </div>
            <div className="form-row">
                <label id='country' htmlFor="country" className='form-label'>country</label>
                <input type="text" name='country' className='form-input' required value={updateUser.country} onChange={handleChange} />
            </div>
            <div className='form-row'>
                <label id='profileImage' htmlFor="profileImage" className='form-label'>profile Image</label>
                <input type="file" name="profileImage" onChange={(e) => setUpdateUser({ ...updateUser, profileImage: e.target.files[0] })} className='form-control'
                />
            </div>
            <button type='submit' className='btn-css btn-block'>Submit</button>
        </form>
    )
}

export default UpdateUser