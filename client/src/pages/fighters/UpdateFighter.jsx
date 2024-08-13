import React from 'react'
import customFetch from '../../utils'
import { Form, useLoaderData, redirect } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const getSingleFighter = (id) => {
    return {
        queryKey: ['fighter', id],
        queryFn: async () => {
            const response = await customFetch('/fighters/' + id);
            return response.data?.fighter;
        }
    }
}
const getAllWeightClasses = () => {
    return {
        queryKey: ['weightClasses'],
        queryFn: async () => {
            const response = await customFetch.get('/weightClasses', { withCredentials: true });
            return response.data;
        }
    }
}

export const loader = (queryClient) => async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(getSingleFighter(id), getAllWeightClasses());
    return id;
}

export const action =
    (queryClient) =>
        async ({ request, params }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            try {
                await customFetch.patch('/fighters/' + params?.id, data);
                queryClient.invalidateQueries(['fighters']);
                toast.success('Fighter updated successfully ');
                return redirect('/fighters');
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                return error;
            }
        };

const UpdateFighter = () => {
    const id = useLoaderData();
    const { data } = useQuery(getSingleFighter(id));
    const { data: data1 } = useQuery(getAllWeightClasses());
    const weightClasses = data1?.weightClasses || [];

    return (
        <Wrapper>
            <Form method="post" className="form">
                <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >Update Fighters</h2>
                <div className="form-row">
                    <label htmlFor="fighterName" className="form-label">fighter Name</label>
                    <input type="text" className="form-input" name='fighterName' defaultValue={data?.fighterName} />
                </div>
                <div className="form-row">
                    <label htmlFor="nickName" className="form-label">nick Name</label>
                    <input type="text" className="form-input" name='nickName' defaultValue={data?.nickName} />
                </div>
                <div className="form-row">
                    <label htmlFor="homeTown" className="form-label">home Town</label>
                    <input type="text" className="form-input" name='homeTown' defaultValue={data?.homeTown} />
                </div>
                <div className="form-row">
                    <label htmlFor="reach" className="form-label">reach</label>
                    <input type="number" className="form-input" name='reach' defaultValue={data?.reach} />
                </div>
                <div className="form-row">
                    <label htmlFor="legReach" className="form-label">leg Reach</label>
                    <input type="number" className="form-input" name='legReach' defaultValue={data?.legReach} />
                </div>
                <div className="form-row">
                    <label htmlFor="status" className="form-label">status</label>
                    <input type="text" className="form-input" name='status' defaultValue={data?.status} />
                </div>
                <div className="form-row">
                    <label htmlFor="fightingStyle" className="form-label">fighting Style</label>
                    <input type="text" className="form-input" name='fightingStyle' defaultValue={data?.fightingStyle} />
                </div>

                <div className="form-row">
                    <label htmlFor="gender" className="form-label">gender</label>
                    <input type="text" className="form-input" name='gender' defaultValue={data?.gender} />
                </div>
                <div className="form-row">
                    <label htmlFor="country" className="form-label">country</label>
                    <input type="text" className="form-input" name='country' defaultValue={data?.country} />
                </div>
                <div className="form-row">
                    <label htmlFor="win" className="form-label">win</label>
                    <input type="number" className="form-input" name='win' defaultValue={data?.win} />
                </div>
                <div className="form-row">
                    <label htmlFor="lose" className="form-label">lose</label>
                    <input type="number" className="form-input" name='lose' defaultValue={data?.lose} />
                </div>
                <div className="form-row">
                    <label htmlFor="draw" className="form-label">draw</label>
                    <input type="number" className="form-input" name='draw' defaultValue={data?.draw} />
                </div>
                <div className="form-row">
                    <label htmlFor='weightClass' className="form-label">weight Class</label>
                    <select name='weightClass' id='weightClass' className='form-select'
                        defaultValue={data.weightClass?._id || ''}>
                        {weightClasses.map((item) => {
                            return <option key={item._id} value={item._id}>{item.className}</option>
                        })}
                    </select>
                </div>
                <div className="form-row">
                    <label htmlFor="fighterImage1" className="form-label">first image</label>
                    <input type="file" className="form-input" name='fighterImage1' />
                </div>
                <div className="form-row">
                    <label htmlFor="fighterImage2" className="form-label">second image</label>
                    <input type="file" className="form-input" name='fighterImage2' />
                </div>
                <button type="submit" className='btn-css btn-block '>Submit</button>
            </Form>

        </Wrapper>
    )
}

const Wrapper = styled.div`
   @media (min-width: 1100px){
    form{
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 1rem;
        max-width: 800px;
        h2,button{
            grid-column: 1 / -1;
        }
    }
   }
`

export default UpdateFighter