import React from 'react'
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../utils';

export const action =
    (queryClient) =>
        async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            console.log(data);
            try {
                await customFetch.post('/weightClasses', data, { withCredentials: true });
                queryClient.invalidateQueries(['weightClasses']);
                toast.success('Weight Class added successfully ');
                return redirect('/weightClasses');
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                return error;
            }
        };

const CreateWeightClasses = () => {
    return (
        <Form method="post" className="form">
            <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >Create Weight Classes</h2>
            <div className="form-row">
                <label htmlFor="className" className="form-label">Class Name</label>
                <input type="text" className="form-input" name='className' />
            </div>
            <div className="form-row">
                <label htmlFor="pound" className="form-label">Pound</label>
                <input type="text" className="form-input" name='pound' />
            </div>
            <button type="submit" className='btn-css btn-block '>Submit</button>
        </Form>
    )
}

export default CreateWeightClasses