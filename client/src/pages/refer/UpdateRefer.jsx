import React from 'react'
import customFetch from '../../utils'
import { Form, useLoaderData, redirect } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const getSingleRefer = (id) => {
    return {
        queryKey: ['refer', id],
        queryFn: async () => {
            const response = await customFetch('/refers/' + id, { withCredentials: true });
            return response.data
        }
    }
}

export const loader = (queryClient) => async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(getSingleRefer(id));
    return id;
}

export const action = (queryClient) => async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.patch('/refers/' + params.id, data, { withCredentials: true });
        queryClient.invalidateQueries(['refers']);
        toast.success('Refer updated successfully');
        return redirect('/refers');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

const UpdateRefer = () => {
    const id = useLoaderData();
    const {
        data: { refer }
    } = useQuery(getSingleRefer(id));

    const { name, age, homeTown, referedEvents } = refer;

    return (
        <Form method="post" className="form">
            <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >update Refer</h2>
            <div className="form-row">
                <label htmlFor="className" className="form-label">Name</label>
                <input type="text" className="form-input" defaultValue={name} name='name' />
            </div>
            <div className="form-row">
                <label htmlFor="age" className="form-label">Age</label>
                <input type="number" className="form-input" defaultValue={age} name='age' />
            </div>
            <div className="form-row">
                <label htmlFor="homeTown" className="form-label">home Town</label>
                <input type="text" className="form-input" defaultValue={homeTown} name='homeTown' />
            </div>
            <div className="form-row">
                <label htmlFor="referedEvents" className="form-label">refered Events</label>
                <input type="number" className="form-input" defaultValue={referedEvents} name='referedEvents' />
            </div>
            <button type="submit" className='btn-css btn-block '>Submit</button>
        </Form>
    )
}

export default UpdateRefer