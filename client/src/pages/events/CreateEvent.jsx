import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Form, redirect } from 'react-router-dom'
import styled from 'styled-components'
import customFetch from '../../utils';
import { toast } from 'react-toastify';

const getAllArenas = () => {
    return {
        queryKey: ['arenas'],
        queryFn: async () => {
            const response = await customFetch('/arena', { withCredentials: true });
            return response.data;
        }
    }
}

export const action =
    (queryClient) =>
        async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            try {
                const response = await customFetch.post('/events', data, {
                    withCredentials: true, headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                queryClient.invalidateQueries(['events']);
                toast.success(' Event added successfully ');
                return redirect('/events/manage');
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                return error;
            }
        };
export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAllArenas());
    return '';
}
const CreateEvent = () => {
    const { data } = useQuery(getAllArenas())
    const arenas = data?.arenas;

    return (
        <Form method='post' className='form' encType='multipart/form-data'>
            <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >Create  Event</h2>
            <div className="form-row">
                <label htmlFor="name" className="form-label">event Name</label>
                <input type="text" className="form-input" name='name' />
            </div>
            <div className="form-row">
                <label htmlFor="date" className="form-label">date</label>
                <input type="datetime-local" className="form-input" name='date' />
            </div>
            <div className="form-row">
                <label htmlFor='arenaId' className="form-label">arena</label>
                <select name='arenaId' id='arenaId' className='form-select' defaultValue={arenas[0]}>
                    {arenas.map((item) => {
                        return <option key={item._id} value={item._id}>{item.name}</option>
                    })}
                </select>
            </div>
            <div className="form-row">
                <label htmlFor="venueInformation" className="form-label">venue Information</label>
                <textarea className="form-input" name='venueInformation' />
            </div>
            <div className="form-row">
                <label htmlFor="eventImage" className="form-label">Event Image</label>
                <input type="file" id='eventImage' className="form-input" name='eventImage' />
            </div>
            <button type="submit" className='btn-css btn-block'>Submit</button>
        </Form>
    )
}

export default CreateEvent