import React from 'react';
import customFetch from '../../utils';
import { Form, useLoaderData, redirect } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const getSingleQuote = (id) => {
  return {
    queryKey: ['quote', id],
    queryFn: async () => {
      const response = await customFetch('/quotes/' + id, {
        withCredentials: true,
      });
      return response.data;
    },
  };
};

const getFighters = () => {
  return {
    queryKey: ['fighters'],
    queryFn: async () => {
      const response = await customFetch('/fighters', {
        withCredentials: true,
      });
      return response.data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(getSingleQuote(id));
    await queryClient.ensureQueryData(getFighters());
    return id;
  };

export const action =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);
    try {
      await customFetch.patch('/quotes/' + params.id, data, {
        withCredentials: true,
      });
      queryClient.invalidateQueries(['quotes']);
      toast.success('Quote updated successfully');
      return redirect('/quotes');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const UpdateQuote = () => {
  const id = useLoaderData();
  let {
    data: { singleQuote },
  } = useQuery(getSingleQuote(id));
  const {
    data: { fighters },
  } = useQuery(getFighters());
  const {
    quote,
    fighter: { fighterName,_id },
  } = singleQuote;

  return (
    <Form method="post" className="form">
      <h2
        style={{
          textAlign: 'center',
          letterSpacing: '4px',
          marginBottom: '1rem',
        }}
      >
        update Quote
      </h2>
      <div className="form-row">
        <label htmlFor="quote" className="form-label">
          Quote
        </label>
        <input
          type="text"
          className="form-input"
          name="quote"
          defaultValue={quote}
        />
      </div>
      <div className="mb-2">
        <select
          name="fighterId"
          defaultValue={_id || ''}
          className="form-select"
          id=""
        >
          {fighters.map((item) => (
            <option key={item._id} value={item._id}>
              {item.fighterName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn-css btn-block ">
        Submit
      </button>
    </Form>
  );
};

export default UpdateQuote;
