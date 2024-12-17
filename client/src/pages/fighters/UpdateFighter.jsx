import React from 'react';
import customFetch, {
  FIGHTER_FIGHTING_STYLE,
  GENDER,
  STATUS,
} from '../../utils';
import {
  Form,
  useLoaderData,
  redirect,
} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import SubmitButton from '../../components/SubmitButton';
import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';

const getSingleFighter = id => {
  return {
    queryKey: ['fighter', id],
    queryFn: async () => {
      const response = await customFetch(
        '/fighters/' + id
      );
      return response.data?.fighter;
    },
  };
};
const getAllWeightClasses = () => {
  return {
    queryKey: ['weightClasses'],
    queryFn: async () => {
      const response = await customFetch.get(
        '/weightClasses',
        { withCredentials: true }
      );
      return response.data;
    },
  };
};

export const loader =
  queryClient =>
  async ({ params }) => {
    const { id } = params;
    await queryClient.ensureQueryData(
      getAllWeightClasses()
    );
    await queryClient.ensureQueryData(
      getSingleFighter(id)
    );
    return id;
  };

export const action =
  queryClient =>
  async ({ request, params }) => {
    const formData = new FormData();
    const data = await request.formData();

    // Append form fields to FormData
    for (let [key, value] of data.entries()) {
      formData.append(key, value);
    }
    console.log(formData);
    try {
      await customFetch.patch(
        '/fighters/' + params?.id,
        formData
      );
      queryClient.invalidateQueries(['fighters']);
      toast.success(
        'Fighter updated successfully '
      );
      return redirect('/fighters');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      console.log(error);
      return error;
    }
  };

const UpdateFighter = () => {
  const id = useLoaderData();
  const { data } = useQuery(getSingleFighter(id));
  const { data: data1 } = useQuery(
    getAllWeightClasses()
  );
  const weightClasses =
    data1?.weightClasses || [];

  return (
    <Wrapper>
      <Form
        method="post"
        className="form"
        encType="multipart/form-data"
      >
        <h2
          style={{
            textAlign: 'center',
            letterSpacing: '4px',
            marginBottom: '1rem',
          }}
        >
          Update Fighters
        </h2>
        <FormRow
          type={'text'}
          name={'fighterName'}
          labelText={'fighter name'}
          defaultValue={data.fighterName}
        />
        <FormRow
          type={'text'}
          name={'nickName'}
          labelText={'nick name'}
          defaultValue={data.nickName}
        />
        <FormRow
          type={'text'}
          name={'homeTown'}
          labelText={'home Town'}
          defaultValue={data.homeTown}
        />
        <FormRow
          type={'number'}
          name={'reach'}
          defaultValue={data.reach}
        />
        <FormRow
          type={'number'}
          name={'legReach'}
          labelText={'leg reach'}
          defaultValue={data.legReach}
        />
        <FormRow
          type={'text'}
          name={'country'}
          defaultValue={data.country}
        />
        <FormRow
          type={'number'}
          name={'win'}
          defaultValue={data.win}
        />
        <FormRow
          type={'number'}
          name={'lose'}
          defaultValue={data.lose}
        />
        <FormRow
          type={'number'}
          name={'draw'}
          defaultValue={data.draw}
        />

        <FormRowSelect
          name={'status'}
          defaultValue={STATUS.ACTIVE}
          list={STATUS}
        />
        <FormRowSelect
          name={'gender'}
          defaultValue={GENDER.MALE}
          list={GENDER}
        />
        <FormRowSelect
          name={'fightingStyle'}
          defaultValue={
            FIGHTER_FIGHTING_STYLE?.BOXING
          }
          list={FIGHTER_FIGHTING_STYLE}
        />

        <div className="form-row">
          <label
            htmlFor="weightClass"
            className="form-label"
          >
            weight Class
          </label>
          <select
            name="weightClass"
            id="weightClass"
            className="form-select"
            defaultValue={data?.weightClass?._id}
          >
            {weightClasses.map(item => {
              return (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.className}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-row">
          <label
            htmlFor="fighterImage1"
            className="form-label"
          >
            First Image
          </label>
          <input
            type="file"
            id="fighterImage1"
            className="form-input"
            name="fighterImage1"
          />
        </div>

        <div className="form-row">
          <label
            htmlFor="fighterImage2"
            className="form-label"
          >
            Second Image
          </label>
          <input
            type="file"
            id="fighterImage2"
            className="form-input"
            name="fighterImage2"
          />
        </div>
        <SubmitButton />
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (min-width: 1100px) {
    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 1rem;
      max-width: 800px;
      h2,
      button {
        grid-column: 1 / -1;
      }
    }
  }
`;

export default UpdateFighter;
