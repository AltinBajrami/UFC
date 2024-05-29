import React from 'react'
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../utils';

export const action =
    (queryClient) =>
        async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            try {
                await customFetch.post('/mini-events', data, { withCredentials: true });
                queryClient.invalidateQueries(['mini-event']);
                toast.success('Mini Event added successfully ');
                return redirect('/mini-event');
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                return error;
            }
        };

const CreateMiniEvent = () => {
    return (
        <Form method="post" className="form">
            <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >Create Mini Event</h2>
            <div className="form-row">
                <label htmlFor="eventTypeName" className="form-label">event Type Name</label>
                <input type="text" className="form-input" name='eventTypeName' />
            </div>
            <button type="submit" className='btn-css btn-block '>Submit</button>
        </Form>
    )
}

export default CreateMiniEvent