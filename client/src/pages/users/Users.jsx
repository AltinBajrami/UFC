
import { useState } from 'react'
import customFetch from '../../utils'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';
import { toast } from 'react-toastify'
import ChangeRole from '../../components/ChangeRole';

const getAllUsers = () => {
    return {
        queryKey: ['users'],
        queryFn: async () => {
            const response = await customFetch('/users', { withCredentials: true });
            return response.data;
        }
    }
}

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAllUsers());
    return "";
}

const Users = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChangeRoleOpen, setIsChangeRoleOpen] = useState(false);
    const { data } = useQuery(getAllUsers());
    const [userId, setUserId] = useState(null);
    const users = data.users;
    const queryClient = useQueryClient();

    const { mutate: deleteUser, isError, error } = useMutation({
        mutationFn: (userId) => customFetch.delete(`users/${userId}`, { withCredentials: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success('User deleted')
            setUserId(null)
            setIsModalOpen(false)
        },
        onError: (error) => {
            toast.error(error.response.data.msg)
        }
    })

    if (isError) {
        console.log(error);
        toast.error(error?.response?.data)
        toast.error(error?.response?.data?.msg)
    }

    const handleDeleteUser = () => {
        deleteUser(userId);
    };

    return (
        <Wrapper>
            <div className='scroll'>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Country</th>
                            <th>Role</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.country}</td>
                                <td>{user.role}</td>
                                <td style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link className='btn btn-primary'
                                        onClick={() => {
                                            setIsChangeRoleOpen(true);
                                            setUserId(user._id)
                                        }}>Change Role</Link>

                                    <Link to={'/users'} className='btn btn-danger'
                                        style={{ textDecoration: 'none' }} onClick={() => {
                                            setIsModalOpen(true);
                                            setUserId(user._id);
                                        }}>delete</Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleDeleteUser}
                />
                {isChangeRoleOpen && <ChangeRole userId={userId}
                    setIsChangeRoleOpen={setIsChangeRoleOpen} setUserId={setUserId} />}
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .scroll{
        overflow-x:auto;
    }
    max-width: 100%;
    table {
        width: 90%;
        margin: 5rem auto;
        border-collapse: collapse;
        margin-bottom: 0;
    }
    
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    
    th {
        background-color: #f2f2f2;
    }
    
    tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    
    tr:hover {
        background-color: #ddd;
    }
`;
export default Users