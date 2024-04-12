import React from 'react'
import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../utils';
import { useQuery } from '@tanstack/react-query';


const getFighters = () => {
    return {
        queryKey: ['fighters'],
        queryFn: async () => {
            const response = await customFetch('/fighters', { withCredentials: true });
            return response.data?.fighters
        }
    }
}

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getFighters());
    return ""
}

export const action = (queryClient) => async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
        await customFetch.post('/quotes', data, { withCredentials: true });
        queryClient.invalidateQueries(['quotes']);
        toast.success('Quote created successfully');
        return redirect('/quotes');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}


const CreateQuote = () => {
    const data = useQuery(getFighters());
    const fighters = data.data || [];
    console.log(fighters);
    return (
        <Form method="post" className="form">
            <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >Create Quote</h2>
            <div className="form-row">
                <label htmlFor="quote" className="form-label">Quote</label>
                <input type="text" className="form-input" name='quote' />
            </div>
            <div className='mb-2'>
                <select name="fighterId" className="form-select" id="">
                    {fighters.map((item) => (
                        <option key={item._id} value={item._id}>
                            {item.fighterName}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className='btn-css btn-block '>Submit</button>
        </Form>
    )
}

export default CreateQuote