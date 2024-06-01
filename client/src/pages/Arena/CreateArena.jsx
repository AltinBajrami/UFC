import React from 'react'
import { Form, redirect, useNavigate, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify';
import customFetch from '../../utils';

export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        const response = await customFetch.post('/arena', data, { withCredentials: true })
        queryClient.invalidateQueries(['arenas'])
        toast.success(response.data.msg)
        return redirect('/arena');
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.msg)
    }
    return null;
}

const CreateArena = () => {
    const navigate = useNavigation();
    const isSubmitting = navigate.state === 'submitting'
    return (
        <Form className='form' method='post'>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }} >Create Arena</h2>
            <div className="form-row">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-input" name='name' required />
            </div>
            <div className="form-row">
                <label htmlFor="location" className="form-label">location</label>
                <input type="text" className="form-input" name='location' required />
            </div>
            <button className='btn-css btn-block' type='submit' disabled={isSubmitting}>{isSubmitting ? 'Submitting' : 'Submit'}</button>
        </Form>
    )
}

export default CreateArena