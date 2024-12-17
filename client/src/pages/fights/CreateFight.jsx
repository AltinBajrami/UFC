import React, { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import customFetch, {
  MINI_EVENTS,
} from '../../utils';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import FormRowSelect from '../../components/FormRowSelect';

const getAllRefers = () => {
  return {
    queryKey: ['refers'],
    queryFn: async () => {
      const response = await customFetch.get(
        '/refers',
        { withCredentials: true }
      );
      return response.data;
    },
  };
};

const getAllEvents = () => {
  return {
    queryKey: ['events'],
    queryFn: async () => {
      const response = await customFetch.get(
        '/events',
        { withCredentials: true }
      );
      return response.data.events;
    },
  };
};

const getAllFighters = () => {
  return {
    queryKey: ['fighters'],
    queryFn: async () => {
      const response = await customFetch.get(
        '/fighters',
        { withCredentials: true }
      );
      return response.data;
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

export const loader = queryClient => async () => {
  await queryClient.ensureQueryData(
    getAllEvents()
  );
  await queryClient.ensureQueryData(
    getAllRefers()
  );
  await queryClient.ensureQueryData(
    getAllFighters()
  );
  await queryClient.ensureQueryData(
    getAllWeightClasses()
  );
  return '';
};

export const action =
  queryClient =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/fights', data);
      queryClient.invalidateQueries(['fights']);
      toast.success(' Fight added successfully ');
      return redirect('/fights');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

const CreateFight = () => {
  const { data } = useQuery(getAllEvents());

  const { data: data2 } = useQuery(
    getAllRefers()
  );
  const { data: data4 } = useQuery(
    getAllFighters()
  );
  const { data: data5 } = useQuery(
    getAllWeightClasses()
  );

  const events = data;
  console.log(
    '🚀 ~ CreateFight ~ events:',
    events
  );
  const refers = data2.refers;
  const weightClasses = data5.weightClasses;
  const [weightClass, setWeightClass] = useState(
    weightClasses?.[4]._id
  );
  const fighters = data4.fighters.filter(
    item =>
      item.weightClass._id === weightClass &&
      item.status === 'active'
  );

  return (
    <Form method="post" className="form">
      <h2
        style={{
          textAlign: 'center',
          letterSpacing: '4px',
          marginBottom: '1rem',
        }}
      >
        Create Fight
      </h2>
      <Wrapper>
        <div className="form-row">
          <label
            htmlFor="weightClassID"
            className="form-label"
          >
            Weight Class
          </label>
          <select
            name="weightClassID"
            id="weightClassID"
            onChange={e =>
              setWeightClass(e.target.value)
            }
            className="form-select"
            defaultValue={weightClass}
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
            htmlFor="fighter1ID"
            className="form-label"
          >
            Fighter 1
          </label>
          <select
            name="fighter1ID"
            id="fighter1ID"
            className="form-select"
            defaultValue={fighters[0]?._id}
          >
            {fighters.map(item => {
              return (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.fighterName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-row">
          <label
            htmlFor="fighter2ID"
            className="form-label"
          >
            Fighter 2
          </label>
          <select
            name="fighter2ID"
            id="fighter2ID"
            className="form-select"
            defaultValue={fighters[1]?._id}
          >
            {fighters.map(item => {
              return (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.fighterName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-row">
          <label
            htmlFor="eventID"
            className="form-label"
          >
            Event{' '}
          </label>
          <select
            name="eventID"
            id="eventID"
            className="form-select"
            defaultValue={events[0]._id}
          >
            {events.map(item => {
              return (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>

        <FormRowSelect
          name={'miniEventID'}
          labelText={'mini Event'}
          defaultValue={MINI_EVENTS.MAIN_EVENT}
          list={MINI_EVENTS}
        />

        <div className="form-row">
          <label
            htmlFor="refereeID"
            className="form-label"
          >
            Referee{' '}
          </label>
          <select
            name="refereeID"
            id="miniEventID"
            className="form-select"
            defaultValue={refers[0]._id}
          >
            {refers.map(item => {
              return (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          className="btn-css btn-block"
        >
          Submit
        </button>
      </Wrapper>
    </Form>
  );
};
const Wrapper = styled.div`
  @media (min-width: 1100px) {
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
`;
export default CreateFight;
