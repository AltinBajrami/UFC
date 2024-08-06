import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import customFetch from '../../utils';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';
import styled from 'styled-components';
import { toast } from 'react-toastify';

const getAll = () => {
    return {
        queryKey: ['mini-events'],
        queryFn: async () => {
            const response = await customFetch.get('/mini-events', { withCredentials: true });
            return response?.data?.miniEvents;
        }
    };
};

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAll());
    return '';
};

const MiniEvent = () => {
    const { data, isLoading, isError, error } = useQuery(getAll());
    const [deleteItemId, setDeleteItemId] = useState(null);
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (id) => customFetch.delete(`mini-events/${id}`, { withCredentials: true }),
        onSuccess: (response) => {
            console.log(response);
            queryClient.invalidateQueries(['mini-events']);
            toast.success('Deleted successfully');
            setDeleteItemId(null);
        },
        onError: (error) => {
            setDeleteItemId(null);
            toast.error(error.response.data.msg);
        }
    });

    const handleDeleteMiniEvent = (id) => {
        setDeleteItemId(id);
        mutate(id);
    };

    if (isLoading) {
        return <div>
            <div className="loading"></div>
        </div>;
    }

    if (isError) {
        return <div>
            <div >
                <h3>{error.message}</h3>
            </div>
        </div>;
    }
    console.log(data);
    return (
        <div style={{ display: 'grid' }}>
            <Link to={'/mini-event/create'} className='btn btn-outline-secondary' style={{ justifySelf: 'start', textDecoration: 'none', margin: '1rem' }}>Create</Link>
            <Wrapper>
                <table>
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th>Customize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link to={`/mini-event/update/${item._id}`} style={{ textDecoration: 'none' }} className='btn btn-success'>Edit</Link>
                                    <Link className='btn btn-danger' style={{ textDecoration: 'none' }} onClick={() => {
                                        setDeleteItemId(item._id);
                                    }}>delete</Link>
                                    <ConfirmationModal
                                        isOpen={deleteItemId === item._id}
                                        onClose={() => setDeleteItemId(null)}
                                        onConfirm={() => handleDeleteMiniEvent(item._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Wrapper>
        </div>
    );
};

const Wrapper = styled.section`
    overflow-x: auto; 
    max-width: 100%;
    table {
        width: 90%;
        margin: 5rem auto;
        border-collapse: collapse;
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
`


export default MiniEvent