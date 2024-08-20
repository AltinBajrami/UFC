import React, { useEffect, useState } from "react";
import { Form, redirect } from 'react-router-dom'
import customFetch from "../../utils";
import { toast } from 'react-toastify'
import styled from "styled-components";

export const action =
    (queryClient) =>
        async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            try {
                await customFetch.post('/fighters', data);
                queryClient.invalidateQueries(['fighters']);
                toast.success('Fighter added successfully ');
                return redirect('/fighters');
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                return error;
            }
        };

const CreateFighter = () => {

    const [weightClasses, setWeightClasses] = useState([]);


    const getAllWeightClasses = async () => {
        try {
            const { data } = await customFetch('/weightClasses');
            setWeightClasses(data?.weightClasses)
        } catch (error) {
            setWeightClasses([]);
        }
    }

    useEffect(() => {
        getAllWeightClasses()
    }, [])



    return (
        <Wrapper>
            <Form method="post" className="form">
                <h2 className="formHeader" >Create Fighters</h2>
                <div className="form-row">
                    <label htmlFor="fighterName" className="form-label">fighter Name</label>
                    <input type="text" className="form-input" name='fighterName' />
                </div>
                <div className="form-row">
                    <label htmlFor="nickName" className="form-label">nick Name</label>
                    <input type="text" className="form-input" name='nickName' />
                </div>
                <div className="form-row">
                    <label htmlFor="homeTown" className="form-label">home Town</label>
                    <input type="text" className="form-input" name='homeTown' />
                </div>
                <div className="form-row">
                    <label htmlFor="reach" className="form-label">reach</label>
                    <input type="number" className="form-input" name='reach' />
                </div>
                <div className="form-row">
                    <label htmlFor="legReach" className="form-label">leg Reach</label>
                    <input type="number" className="form-input" name='legReach' />
                </div>
                <div className="form-row">
                    <label htmlFor="status" className="form-label">status</label>
                    <input type="text" className="form-input" name='status' />
                </div>
                <div className="form-row">
                    <label htmlFor="fightingStyle" className="form-label">fighting Style</label>
                    <input type="text" className="form-input" name='fightingStyle' />
                </div>

                <div className="form-row">
                    <label htmlFor="gender" className="form-label">gender</label>
                    <input type="text" className="form-input" name='gender' />
                </div>
                <div className="form-row">
                    <label htmlFor="country" className="form-label">country</label>
                    <input type="text" className="form-input" name='country' />
                </div>
                <div className="form-row">
                    <label htmlFor="win" className="form-label">win</label>
                    <input type="number" className="form-input" name='win' />
                </div>
                <div className="form-row">
                    <label htmlFor="lose" className="form-label">lose</label>
                    <input type="number" className="form-input" name='lose' />
                </div>
                <div className="form-row">
                    <label htmlFor="draw" className="form-label">draw</label>
                    <input type="number" className="form-input" name='draw' />
                </div>
                <div className="form-row">
                    <label htmlFor='weightClass' className="form-label">weight Class</label>
                    <select name='weightClass' id='weightClass' className='form-select' defaultValue={weightClasses[0]?._id}>
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
export default CreateFighter