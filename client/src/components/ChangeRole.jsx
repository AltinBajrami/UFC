import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch from '../utils';

const ChangeRole = ({ userId, setUserId, setIsChangeRoleOpen }) => {
    const [role, setRole] = useState('user');
    const queryClient = useQueryClient();
    const { mutate: changeRole } = useMutation({
        mutationFn: () => customFetch.patch(`/users/changeUserRole/${userId}`, { role }, { withCredentials: true }),
        onSuccess: (response) => {
            console.log(response);
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success(response?.data?.msg || 'User updated');
            setUserId(null);
            setIsChangeRoleOpen(false);
        },
        onError: (error) => {
            toast.error(error.response.data.msg);
            console.log(error);
            setIsChangeRoleOpen(false);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        changeRole();
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    return (
        <Wrapper>
            <div className="role-center">
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-row">
                        <label className="form-label">Role</label>
                        <select name="role" id="" className='form-select' value={role}
                            onChange={handleRoleChange}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                        <button type='submit' className='btn-css btn-block'>Submit</button>
                        <button type='button' onClick={() => setIsChangeRoleOpen(false)} className="close-btn"><FaTimes /></button>
                    </div>
                </form>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;

    .form {
        background: white;
        max-width: 500px;
        width: 250px;
        padding: 2rem 3rem;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        position: relative;
    }
    @media (min-width: 500px){
        .form{
            width: 350px;
        }
    }
    @media (min-width: 700px){
        .form{
            width: 500px;
        }
    }
    .form-row {
        margin-bottom: 1.5rem;
    }

    .form-label {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
        display: block;
    }

    .form-select {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
    }

    .btn-css {
        margin-top: 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .btn-css:hover {
        background-color: #0056b3;
    }
    .close-btn{
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: red;
        background-color: transparent;
        border: transparent;
        font-size: 1.5rem;
    }
`;

export default ChangeRole;
