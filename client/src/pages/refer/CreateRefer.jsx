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
                await customFetch.post('/refers', data, { withCredentials: true });
                queryClient.invalidateQueries(['refers']);
                toast.success('Refer added successfully ');
                return redirect('/refers');
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                return error;
            }
        };

const CreateRefer = () => {
    return (
        <Form method="post" className="form">
            <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >Create Refer</h2>
            <div className="form-row">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-input" name='name' />
            </div>
            <div className="form-row">
                <label htmlFor="referedEvents" className="form-label">Refered Events</label>
                <input type="text" className="form-input" name='referedEvents' />
            </div>
            <div className="form-row">
                <label htmlFor="age" className="form-label">Age</label>
                <input type="text" className="form-input" name='age' />
            </div>
            <div className="form-row">
                <label htmlFor="homeTown" className="form-label">Home Town</label>
                <input type="text" className="form-input" name='homeTown' />
            </div>
            <button type="submit" className='btn-css btn-block '>Submit</button>
        </Form>
    )
}

export default CreateRefer