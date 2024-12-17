import React, {
  useEffect,
  useState,
} from 'react';
import { Form, redirect } from 'react-router-dom';
import customFetch, {
  GENDER,
  FIGHTER_FIGHTING_STYLE,
  STATUS,
} from '../../utils';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import FormRow from '../../components/FormRow';
import FormRowSelect from '../../components/FormRowSelect';
import SubmitButton from '../../components/SubmitButton';

export const action =
  queryClient =>
  async ({ request }) => {
    const formData = new FormData();
    const data = await request.formData();

    // Append form fields to FormData
    for (let [key, value] of data.entries()) {
      formData.append(key, value);
    }

    try {
      await customFetch.post(
        '/fighters',
        formData
      );
      queryClient.invalidateQueries(['fighters']);
      toast.success(
        'Fighter added successfully '
      );
      // return redirect('/fighters');
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const CreateFighter = () => {
  const [weightClasses, setWeightClasses] =
    useState([]);

  const getAllWeightClasses = async () => {
    try {
      const { data } = await customFetch(
        '/weightClasses'
      );
      setWeightClasses(data?.weightClasses);
    } catch (error) {
      setWeightClasses([]);
    }
  };

  useEffect(() => {
    getAllWeightClasses();
  }, []);

  return (
    <Wrapper>
      <Form
        method="post"
        className="form"
        encType="multipart/form-data"
      >
        <h2 className="formHeader">
          Create Fighter
        </h2>
        <FormRow
          type={'text'}
          name={'fighterName'}
          labelText={'fighter name'}
        />
        <FormRow
          type={'text'}
          name={'nickName'}
          labelText={'nick name'}
        />
        <FormRow
          type={'text'}
          name={'homeTown'}
          labelText={'home Town'}
        />
        <FormRow type={'number'} name={'reach'} />
        <FormRow
          type={'number'}
          name={'legReach'}
          labelText={'leg reach'}
        />
        <FormRow type={'text'} name={'country'} />
        <FormRow type={'number'} name={'win'} />
        <FormRow type={'number'} name={'lose'} />
        <FormRow type={'number'} name={'draw'} />

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
            defaultValue={weightClasses[0]?._id}
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
export default CreateFighter;
