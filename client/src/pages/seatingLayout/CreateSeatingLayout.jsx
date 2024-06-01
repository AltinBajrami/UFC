import React from 'react'
import customFetch from '../../utils';
import { Form, redirect, useNavigation } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

export const action = (queryClient) => async ({ request }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/seatingLayout', data, { withCredentials: true });
        queryClient.invalidateQueries(['seating-layout']);
        toast.success('seating layout created successfully');
        return redirect('/seating-layout');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
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

export const loader = (queryClient) => async (req) => {
    await queryClient.ensureQueryData(getAllArenas())
    return "232";
}

const CreateSeatingLayout = () => {
    const navigate = useNavigation();
    const isSubmitting = navigate.state === 'submitting';
    let { data } = useQuery(getAllArenas());
    const arenas = data.arenas || []

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <h5>create Seating layout</h5>
                <div className="form-row">
                    <label htmlFor="sectionName" className="form-label">section Name</label>
                    <input type="text" id='sectionNames' name='sectionName' className="form-input" />
                </div>
                <div className="form-row">
                    <label htmlFor="row" className="form-label">rows</label>
                    <input type="number" id='row' name='row' required className="form-input" />
                </div>
                <div className="form-row">
                    <label htmlFor="column" className="form-label">columns</label>
                    <input type="number" id='column' name='column' required className="form-input" />
                </div>
                <div className="form-row">
                    <select name="arenaId" className="form-select" id="">
                        {arenas.map((a) => (
                            <option key={a._id} value={a._id}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className='btn-css btn-block' type='submit' disabled={isSubmitting}>{isSubmitting ?
                    'Submitting' : 'Submit'}</button>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    h5{
        text-align: center;
        margin-bottom: 2rem;
    }
`

export default CreateSeatingLayout