import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmationModal from '../../components/ConfirmationModal';
import { toast } from 'react-toastify'
import styled from 'styled-components';
import customFetch from '../../utils';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const getAll = () => {
    return {
        queryKey: ['weightClasses'],
        queryFn: async () => {
            const response = await customFetch.get('/weightClasses', { withCredentials: true });
            return response.data;
        }
    }
}

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAll());
    return "";
}


const WeightClasses = () => {
    const [deleteItemId, setDeleteItemId] = useState(null);
    const { data, error, isLoading, isError } = useQuery(getAll());
    const { weightClasses } = data;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (id) => customFetch.delete(`weightClasses/${id}`, { withCredentials: true }),
        onSuccess: (response) => {
            queryClient.invalidateQueries(['weightClasses'])
            toast.success('Deleted successfully')
            setDeleteItemId(null);
        },
        onError: (error) => {
            setDeleteItemId(null);
            toast.error(error.response.data.msg)
        }
    })
    const handleDeleteWeightClass = (id) => {
        setDeleteItemId(id)
        mutate(id)
    };


    if (isLoading) {
        return <div>
            <div className="loading"></div>
        </div>
    }

    if (isError) {
        return <div>
            <div >
                <h3>{error.message}</h3>
            </div>
        </div>
    }


    return (
        <div style={{ display: 'grid' }}>
            <Link to={'/weightClasses/create'} className='btn btn-outline-secondary' style={{ justifySelf: 'start', textDecoration: 'none', margin: '1rem' }}>Create</Link>
            <Wrapper>
                <table>
                    <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Pound</th>
                            <th>Customize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weightClasses.map((item) => (
                            <tr key={item._id}>
                                <td>{item.className}</td>
                                <td>{item.pound}</td>
                                <td style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link to={`/weightClasses/update/${item._id}`} style={{ textDecoration: 'none' }} className='btn btn-success'>Edit</Link>
                                    <Link to={'/weightClasses'} className='btn btn-danger' style={{ textDecoration: 'none' }} onClick={() => {
                                        setDeleteItemId(item._id);
                                    }}>delete</Link>
                                    <ConfirmationModal
                                        isOpen={deleteItemId === item._id}
                                        onClose={() => setDeleteItemId(null)}
                                        onConfirm={() => handleDeleteWeightClass(item._id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Wrapper>
        </div>
    )
}

const Wrapper = styled.div`
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
`;
export default WeightClasses