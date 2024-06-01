import React from 'react'
import { Form, redirect, useLoaderData } from 'react-router-dom';
import customFetch from '../../utils';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

const getArena = (id) => {
    return {
        queryKey: ['arena', `${id}`],
        queryFn: async () => {
            const response = await customFetch(`/arena/${id}`, { withCredentials: true });
            return response.data;
        }
    }
}

export const action = (queryClient) => async ({ request, params }) => {
    const { id } = params;
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        const response = await customFetch.patch('/arena/' + id, data, { withCredentials: true })
        console.log(response.data);
        queryClient.invalidateQueries(['arenas'], ['arena', `${id}`])
        toast.success('Arena updated')
        return redirect('/arena');
    } catch (error) {
        toast.error(error?.response?.data?.msg)
    }
    return null;
}


export const loader = (queryClient) => async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(getArena(id))
    return id;
}

const UpdateArena = () => {
    const id = useLoaderData();
    const { data } = useQuery(getArena(id));

    const { arena } = data;
    const { name, location, seatingCapacity } = arena

    return (
        <Form className='form' method='post'>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }} >Update Arena</h2>
            <div className="form-row">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-input" name='name' required defaultValue={name} />
            </div>
            <div className="form-row">
                <label htmlFor="location" className="form-label">location</label>
                <input type="text" className="form-input" name='location' required defaultValue={location} />
            </div>
            <div className="form-row">
                <label htmlFor="seatingCapacity" className="form-label">Seat Capasity</label>
                <input type="number" className="form-input" name='seatingCapacity' required defaultValue={seatingCapacity} />
            </div>
            <button className='btn-css btn-block' type='submit'>Submit</button>
        </Form>
    )
}

export default UpdateArena