import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Form, useLoaderData, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../utils';

const getSingleEvent = (id) => {
    return {
        queryKey: ['event', id],
        queryFn: async () => {
            const response = await customFetch('/events/' + id, { withCredentials: true });
            return response.data
        }
    }
}
const getAllArenas = () => {
    return {
        queryKey: ['arenas'],
        queryFn: async () => {
            const response = await customFetch('/arena', { withCredentials: true });
            return response.data;
        }
    }
}

export const loader = (queryClient) => async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(getSingleEvent(id));
    await queryClient.ensureQueryData(getAllArenas());
    return id;
}

export const action = (queryClient) => async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.patch('/events/' + params.id, data, {
            withCredentials: true, headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        queryClient.invalidateQueries(['events']);
        toast.success('Event updated successfully');
        return redirect('/events/manage');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

const UpdateEvent = () => {
    const id = useLoaderData()
    const { data } = useQuery(getSingleEvent(id))
    const { data: data1 } = useQuery(getAllArenas())
    const { arenas } = data1;

    const { name, date, venueinformation, arenaid } = data;

    return (
        <Form method='post' className='form' encType='multipart/form-data'>
            <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >Update  Event</h2>
            <div className="form-row">
                <label htmlFor="name" className="form-label">event Name</label>
                <input type="text" className="form-input" name='name' defaultValue={name} />
            </div>
            <div className="form-row">
                <label htmlFor="date" className="form-label">date</label>
                <input type="datetime-local" className="form-input" name='date' defaultValue={date} />
            </div>
            <div className="form-row">
                <label htmlFor='arenaId' className="form-label">arena</label>
                <select name='arenaId' id='arenaId' className='form-select'
                    defaultValue={arenas.find((item) => item._id == arenaid)._id}>
                    {arenas.map((item) => {
                        return <option key={item._id} value={item._id}>{item.name}</option>
                    })}
                </select>
            </div>
            <div className="form-row">
                <label htmlFor="venueInformation" className="form-label">venue Information</label>
                <input type="textarea" className="form-input" name='venueInformation' defaultValue={venueinformation} />
            </div>
            <div className="form-row">
                <label htmlFor="eventImage" className="form-label">Event Image</label>
                <input type="file" id='eventImage' className="form-input" name='eventImage' />
            </div>
            <button type="submit" className='btn-css btn-block'>Submit</button>
        </Form>
    )
}

export default UpdateEvent