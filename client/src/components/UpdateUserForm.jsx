import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import styled from 'styled-components';
import customFetch from '../utils';
import { toast } from 'react-toastify'
import { redirect, useNavigate } from 'react-router-dom';

const UpdateUserForm = ({ firstName, lastName, email, country, image }) => {
    const [updateUser, setUpdateUser] = useState({
        firstName, lastName, email, country, profileImage: null
    });
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
    }
    const { mutate: updateUserFn } = useMutation({
        mutationFn: async (user) => await customFetch.patch('/users/updateUser', { ...user }, {
            withCredentials: true, headers: {
                "Content-Type": "multipart/form-data",
            },
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
            toast.success('Updated profile successfully!');
            return navigate('/profile')
        },
        onError: (error) => {
            console.log(error);
            toast.error(error?.response?.data?.msg);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateUserFn(updateUser)
    }

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <div className="profile-container">
                    <img src={'http://localhost:5000/' + image} alt="User Image" className='profile-img' />
                </div>
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
                    <input type="file" id='profileImage2' name="profileImage" onChange={(e) => setUpdateUser({ ...updateUser, profileImage: e.target.files[0] })} className='form-control'
                    />
                </div>
                <button type='submit' className='btn-css btn-block'>Submit</button>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .form{
        box-shadow: 0px 0px 0px;
        display: grid;
        padding-top: 0;
        grid-template-columns: 1fr;
        align-items: center;
    }
    .profile-container{
        width: 100%;
        margin-bottom: 1rem;
    }
    .profile-img{
        border-radius: 50%;
        width: 150px;
        height: 150px;
        object-fit: cover;
    }
    @media (min-width: 500px){
        .form{
            grid-template-columns: 1fr 1fr;
            gap: 1rem ;
        }
    }
    @media (min-width: 800px){
        .form{
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            place-items: center;
        }
        .profile-container{
            grid-column:1 /3 ;
             display: grid;
            place-items: center;
        }
        .btn-css{
            margin-bottom: -0.5rem;
            max-width: 220px;
        }
        #profileImage2{
            max-width: 220px;
        }
    }

`
export default UpdateUserForm