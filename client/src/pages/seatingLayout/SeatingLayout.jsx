import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import customFetch from '../../utils';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const getAllSeatingLayout = () => {
    return {
        queryKey: ['seating-layout'],
        queryFn: async () => {
            const response = await customFetch('/seatingLayout', { withCredentials: true });
            return response.data;
        }
    }
}

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAllSeatingLayout());
    return ';'
}

const SeatingLayout = () => {
    const { data, isLoading } = useQuery(getAllSeatingLayout());


    const queryClient = useQueryClient();
    const [deleteItemId, setDeleteItemId] = useState(null);

    const { mutate } = useMutation({
        mutationFn: (id) => customFetch.delete(`seatingLayout/${id}`, { withCredentials: true }),
        onSuccess: (response) => {
            console.log(response);
            queryClient.invalidateQueries(['seating-layout']);
            toast.success('Deleted successfully');
            setDeleteItemId(null);
        },
        onError: (error) => {
            setDeleteItemId(null);
            toast.error(error.response.data.msg);
        }
    });
    const handleDeleteSeatingLayout = (id) => {
        setDeleteItemId(id);
        mutate(id);
    };

    if (isLoading) {
        return <div className="loading"></div>
    }

    const { seatingLayouts } = data
    return (
        <Wrapper className='page'>
            <div className="section">

                <Link to={'/seating-layout/create'} className='btn btn-outline-secondary' style={{ justifySelf: 'start', textDecoration: 'none', margin: '1rem' }}>Create</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rows</th>
                            <th>Columns</th>
                            <th>Arena</th>
                            <th>Customize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {seatingLayouts.map((item) => (
                            <tr key={item._id}>
                                <td>{item.sectionName}</td>
                                <td>{item.row}</td>
                                <td>{item.column}</td>
                                <td>{item.arena.name}</td>
                                <td style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link to={`/seating-layout/update/${item._id}`} style={{ textDecoration: 'none' }} className='btn btn-success'>Edit</Link>
                                    <Link className='btn btn-danger' style={{ textDecoration: 'none' }} onClick={() => {
                                        setDeleteItemId(item._id);
                                    }}>delete</Link>
                                    <ConfirmationModal
                                        isOpen={deleteItemId === item._id}
                                        onClose={() => setDeleteItemId(null)}
                                        onConfirm={() => handleDeleteSeatingLayout(item._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    max-width: 100%;
    .section{
        display: grid;
        overflow-x: auto;
    }
    table {
        width: 90%;
        margin: 5rem auto;
        height: 5rem;
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
`
export default SeatingLayout