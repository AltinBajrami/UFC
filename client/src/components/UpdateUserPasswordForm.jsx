import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import styled from 'styled-components';
import customFetch from '../utils';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const UpdateUserPasswordForm = () => {
    const [passwords, setPasswords] = useState({
        oldPassword: '', newPassword: '', newPassword2: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPasswords({ ...passwords, [e.target.name]: e.target.value });
    }

    const { mutate: updateUserPasswordFn } = useMutation({
        mutationFn: async (passwords) => await customFetch.patch('/users/updatePassword',
            { ...passwords }, {
            withCredentials: true,
        }),
        onSuccess: (response) => {
            toast.success(response.data.msg);
            setPasswords({ newPassword: '', newPassword2: '', oldPassword: '' })
            return navigate('/profile');
        },
        onError: (error) => {
            toast.error(error?.response?.data?.msg);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.newPassword2) {
            toast.error('New passwords do not match');
            return;
        }
        updateUserPasswordFn(passwords);
    }

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="oldPassword" className='form-label'>Current Password</label>
                    <input type="password" name='oldPassword' className='form-input' required value={passwords.oldPassword} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label htmlFor="newPassword" className='form-label'>New Password</label>
                    <input type="password" name='newPassword' className='form-input' required value={passwords.newPassword} onChange={handleChange} />
                </div>
                <div className="form-row">
                    <label htmlFor="newPassword2" className='form-label'>Confirm New Password</label>
                    <input type="password" name='newPassword2' className='form-input' required value={passwords.newPassword2} onChange={handleChange} />
                </div>
                <button type='submit' className='btn-css btn-block'>Submit</button>
            </form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .form{
        box-shadow: 0px 0px;
    }
`

export default UpdateUserPasswordForm;
