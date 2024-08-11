import { Link, useLoaderData } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import customFetch, { TableWrapper } from "../../utils";
import ConfirmationModal from "../../components/ConfirmationModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const getAllFightFinishes = () => {
    return {
        queryKey: ['fightFinishs'],
        queryFn: async () => {
            const response = await customFetch.get('/fightFinish');

            console.log(response.data.fightFinishs);

            return response.data.fightFinishs;
        }
    };
};
export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAllFightFinishes());
    return '';
}

const FightsFinish = () => {
    const { data } = useQuery(getAllFightFinishes());
    const fightFinishs = data || [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fightFinishId, setFightFinishId] = useState(null);
    const queryClient = useQueryClient();

    const { mutate: deleteFightFinish, isError, error } = useMutation({
        mutationFn: (id) => customFetch.delete(`/fightFinish/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fightFinishs'] })
            toast.success('fight finish deleted')
            setFightFinishId(null)
            setIsModalOpen(false)
        },
        onError: (error) => {
            toast.error(error.response.data.msg)
        }
    })

    if (isError) {
        toast.error(error?.response?.data?.msg)
    }

    const handleDeleteFightFinish = () => {
        deleteFightFinish(fightFinishId);
    };

    return (
        <TableWrapper>
            <Link to={'/fightFinish/create'} className='btn btn-outline-secondary'
                style={{ justifySelf: 'start', textDecoration: 'none', margin: '1rem' }}>Create</Link>
            <div className='scroll'>
                <table>
                    <thead>
                        <tr>
                            <th>Finish type</th>
                            <th>Description</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fightFinishs.map((f) => (
                            <tr key={f._id}>
                                <td>{f.finishType}</td>
                                <td>{f.description}</td>
                                <td style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link to={'/fightFinish/update/' + f._id} className='btn btn-primary'>Update</Link>

                                    <Link className='btn btn-danger'
                                        style={{ textDecoration: 'none' }} onClick={() => {
                                            setIsModalOpen(true);
                                            setFightFinishId(f._id);
                                        }}>delete</Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleDeleteFightFinish}
                />
            </div>
        </TableWrapper>
    )
}


export default FightsFinish