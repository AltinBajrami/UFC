import React from 'react'
import customFetch from '../../utils'
import { Form, useLoaderData, redirect } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const getSingleWeightClass = (id) => {
    return {
        queryKey: ['weightClass', id],
        queryFn: async () => {
            const response = await customFetch('/weightClasses/' + id, { withCredentials: true });
            return response.data
        }
    }
}

export const loader = (queryClient) => async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(getSingleWeightClass(id));
    return id;
}

export const action = (queryClient) => async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.patch('/weightClasses/' + params.id, data, { withCredentials: true });
        queryClient.invalidateQueries(['weightClasses']);
        toast.success('Weight Class updated successfully ');
        return redirect('/weightClasses');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

const UpdateWeightClasses = () => {
    const id = useLoaderData();
    const {
        data: { weightClass }
    } = useQuery(getSingleWeightClass(id));

    const { className, pound } = weightClass;

    return (
        <Form method="post" className="form">
            <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >update Weight Class</h2>
            <div className="form-row">
                <label htmlFor="className" className="form-label">Class Name</label>
                <input type="text" className="form-input" defaultValue={className} name='className' />
            </div>
            <div className="form-row">
                <label htmlFor="pound" className="form-label">Pound</label>
                <input type="text" className="form-input" defaultValue={pound} name='pound' />
            </div>
            <button type="submit" className='btn-css btn-block '>Submit</button>
        </Form>
    )
}

export default UpdateWeightClasses