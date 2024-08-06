import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'
import customFetch from '../../utils';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
day.extend(advancedFormat);

const getAll = () => {
    return {
        queryKey: ['events'],
        queryFn: async () => {
            const response = await customFetch.get('/events', { withCredentials: true });
            return response.data.events;
        }
    };
};

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAll());
    return '';
};

const ManageEvents = () => {
    const { data, isLoading, isError, error } = useQuery(getAll());
    const [deleteItemId, setDeleteItemId] = useState(null);
    const queryClient = useQueryClient();
    console.log(data);

    const { mutate } = useMutation({
        mutationFn: (id) => customFetch.delete(`/events/${id}`, { withCredentials: true }),
        onSuccess: (response) => {
            queryClient.invalidateQueries(['events']);
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

    return (
        <div style={{ display: 'grid' }}>
            <Link to={'/events/create'} className='btn btn-outline-secondary' style={{ justifySelf: 'start', textDecoration: 'none', margin: '1rem' }}>Create</Link>
            <Wrapper>
                <table>
                    <thead>
                        <tr>
                            <th> Name</th>
                            <th>Venue Information</th>
                            <th>date</th>
                            <th>Customize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item._id}>
                                <td>{item.name}</td>
                                <td>{item.venueInformation}</td>
                                <td>{day(item.date).format('MMM D, YYYY h:mm ')}</td>
                                <td className='customizeBtns' >
                                    <Link to={`/events/update/${item._id}`} style={{ textDecoration: 'none' }} className='btn btn-success'>Edit</Link>
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
    max-width: 100%;
    overflow-x: auto;
    margin: 5rem auto;

    table {
        width: 90%;
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
    .customizeBtns{
         display: flex;
         gap: 1rem;
    }

`


export default ManageEvents