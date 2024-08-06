import React from 'react'
import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../utils';
import { useQuery } from '@tanstack/react-query';

const getSingleMiniEvent = (id) => {
    return {
        queryKey: ['mini-event', id],
        queryFn: async () => {
            const response = await customFetch('/mini-events/' + id, { withCredentials: true });
            return response.data.miniEvent;
        }
    }
}

export const loader = (queryClient) => async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(getSingleMiniEvent(id));
    return id;
}

export const action = (queryClient) => async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.patch('/mini-events/' + params.id, data, { withCredentials: true });
        queryClient.invalidateQueries(['mini-event']);
        toast.success('MiniEvent updated successfully');
        return redirect('/mini-event');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

const UpdateMiniEvent = () => {
    const id = useLoaderData();
    const { data } = useQuery(getSingleMiniEvent(id))

    let { name } = data;
    return (
        <Form method="post" className="form">
            <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >update Mini event</h2>
            <div className="form-row">
                <label htmlFor="name" className="form-label">event Type Name</label>
                <input type="text" className="form-input" name='name' defaultValue={name} />
            </div>
            <button type="submit" className='btn-css btn-block '>Submit</button>
        </Form>
    )
}

export default UpdateMiniEvent