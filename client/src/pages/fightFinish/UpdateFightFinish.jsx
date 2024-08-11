import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLoaderData, Form, redirect } from "react-router-dom";
import axios from 'axios'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import customFetch from "../../utils";
import { toast } from "react-toastify";

const getFightFinish = (id) => {
    return {
        queryKey: ['fightFinishs', id],
        queryFn: async () => {
            const response = await customFetch('/fightFinish/' + id);
            console.log(response.data);

            return response.data.fightFinish;
        }
    }
}

export const loader = (queryClient) => async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(getFightFinish(id));
    return id;
}

export const action = (queryClient) => async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.patch('/fightFinish/' + params.id, data);
        queryClient.invalidateQueries(['fightFinishs']);
        toast.success('Fight finish updated successfully');
        return redirect('/fightFinish');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
}

const UpdateFightFinish = () => {
    const id = useLoaderData();
    const { data } = useQuery(getFightFinish(id));
    console.log(data);

    return (
        <Form method="post" className="form">
            <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >Update Fight Finish</h2>
            <div className="form-row">
                <label htmlFor="finishType" className="form-label">finish type</label>
                <input type="text" className="form-input" defaultValue={data?.finishType} name='finishType' />
            </div>
            <div className="form-row">
                <label htmlFor="description" className="form-label">description</label>
                <input type="text" className="form-input" defaultValue={data?.description} name='description' />
            </div>
            <button type="submit" className='btn-css btn-block '>Submit</button>
        </Form>
    )
}

export default UpdateFightFinish