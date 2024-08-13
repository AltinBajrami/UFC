import React, { useState } from 'react'
import customFetch from '../../utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import ConfirmationModal from '../../components/ConfirmationModal';
import styled from 'styled-components';


const getAllArenas = () => {
    return {
        queryKey: ['arenas'],
        queryFn: async () => {
            const response = await customFetch('/arena', { withCredentials: true });
            return response.data;
        }
    }
}

export const loader = (queryClient) => async (req) => {
    await queryClient.ensureQueryData(getAllArenas())
    return null;
}

const Arena = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [arenaId, setArenaId] = useState(null);
    let { data, isError, isLoading } = useQuery(getAllArenas());

    const queryClient = useQueryClient();

    const { mutate: handleDeleteArena } = useMutation({
        mutationFn: ({ id }) => customFetch.delete('/arena/' + id, { withCredentials: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['arenas'] })
            toast.success('Arena deleted')
        },
        onError: (error) => {
            toast.error(error.response.data.msg)
        }
    })

    if (isLoading) {
        return <div className="loading"></div>
    }
    if (isError) {
        return <h1 style={{ marginTop: '3rem', textAlign: 'center' }}>There was an error</h1>
    }


    if (data?.length === 0) {
        return <section style={{ display: 'grid', placeItems: 'center', height: '70vh' }}>
            <div className="" style={{ textAlign: 'center' }}>
                <h2>there are no arenas create some</h2>
                <Link to={'create'} className='btn-css' style={{ marginTop: '1rem', textDecoration: 'none' }} >Create</Link>
            </div>
        </section>
    }

    const { arenas } = data;
    return <>
        <Wrapper className='page'>
            <div className="section">
                <Link to={'create'} className='btn-css'
                    style={{ marginTop: '1rem', textDecoration: 'none', marginLeft: '1rem' }} >Create</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Seat Capacity</th>
                            <th>Customize</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arenas.map((arena) => (
                            <tr key={arena._id}>
                                <td>{arena.name}</td>
                                <td>{arena.location}</td>
                                <td>{arena.seatingCapacity}</td>
                                <td style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link to={`update/${arena._id}`} className='btn btn-success'>Edit</Link>
                                    <Link to={'/arena'} className='btn btn-danger' style={{ textDecoration: 'none' }} onClick={() => {
                                        setIsModalOpen(true);
                                        setArenaId(arena._id)
                                    }}>delete</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={() => { handleDeleteArena({ id: arenaId }); setIsModalOpen(false) }}
                />

            </div>
        </Wrapper>
    </>
}
const Wrapper = styled.div`
    .section{
        overflow-x: auto; 
    }
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

export default Arena