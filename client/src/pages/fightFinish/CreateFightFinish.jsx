import React from "react";
import { Form, redirect } from "react-router-dom";
import customFetch from "../../utils";
import { toast } from "react-toastify";

export const action =
    (queryClient) =>
        async ({ request }) => {
            const formData = await request.formData();
            const data = Object.fromEntries(formData);
            try {
                await customFetch.post('/fightFinish', data);
                queryClient.invalidateQueries(['fightFinishs']);
                toast.success(' Fight finish added successfully ');
                return redirect('/fightFinish');
            } catch (error) {
                toast.error(error?.response?.data?.msg);
                return error;
            }
        };

const CreateFightFinish = () => {

    return (
        <Form method="post" className="form">
            <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >Create Fight Finish</h2>
            <div className="form-row">
                <label htmlFor="finishType" className="form-label">finish type</label>
                <input type="text" className="form-input" name='finishType' />
            </div>
            <div className="form-row">
                <label htmlFor="description" className="form-label">description</label>
                <input type="text" className="form-input" name='description' />
            </div>
            <button type="submit" className='btn-css btn-block '>Submit</button>
        </Form>
    )
}


export default CreateFightFinish