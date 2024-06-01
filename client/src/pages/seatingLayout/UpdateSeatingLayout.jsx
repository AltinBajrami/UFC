import React from 'react'
import customFetch from '../../utils';
import { Form, redirect, useLoaderData, useNavigation } from 'react-router-dom';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

const getAllArenas = () => {
    return {
        queryKey: ['arenas'],
        queryFn: async () => {
            const response = await customFetch('/arena', { withCredentials: true });
            return response.data;
        }
    }
}
const getSingleSeatingLayout = (id) => {
    return {
        queryKey: ['seating-layout', id],
        queryFn: async () => {
            const response = await customFetch('/seatingLayout/' + id, { withCredentials: true });
            return response.data
        }
    }
}

export const action = (queryClient) => async ({ request, params }) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData);
    try {
        await customFetch.patch('/seatingLayout/' + params.id, data, { withCredentials: true });
        queryClient.invalidateQueries(['seating-layout']);
        queryClient.invalidateQueries(['seating-layout', params.id]);
        toast.success('seating layout created successfully');
        return redirect('/seating-layout');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}


export const loader = (queryClient) => async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(getAllArenas())
    await queryClient.ensureQueryData(getSingleSeatingLayout(id))
    return id;
}

const CreateSeatingLayout = () => {
    const navigate = useNavigation();
    const isSubmitting = navigate.state === 'submitting';
    const id = useLoaderData();

    let { data } = useQuery(getAllArenas());
    let { data: { seatingLayout } } = useQuery(getSingleSeatingLayout(id));

    const arenas = data.arenas || []
    const { sectionName, row, column, arena: { _id } } = seatingLayout;

    return (
        <Wrapper>
            <Form method='post' className='form'>
                <h5>update Seating layout</h5>
                <div className="form-row">
                    <label htmlFor="sectionName" className="form-label">section Name</label>
                    <input type="text" id='sectionNames' name='sectionName' defaultValue={sectionName} className="form-input" />
                </div>
                <div className="form-row">
                    <label htmlFor="row" className="form-label">rows</label>
                    <input type="number" id='row' name='row' defaultValue={row} required className="form-input" />
                </div>
                <div className="form-row">
                    <label htmlFor="column" className="form-label">columns</label>
                    <input type="number" id='column' name='column' defaultValue={column} required className="form-input" />
                </div>
                <div className="form-row">
                    <select name="arenaId" defaultValue={_id || ''} className="form-select" id="arenaId">
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