import React, { useState } from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../../utils";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const getAllRefers = () => {
  return {
    queryKey: ['refers'],
    queryFn: async () => {
      const response = await customFetch.get('/refers', { withCredentials: true });
      return response.data;
    }
  };
};

const getAllEvents = () => {
  return {
    queryKey: ['events'],
    queryFn: async () => {
      const response = await customFetch.get('/events', { withCredentials: true });
      return response.data.events;
    }
  };
};

const getAllMiniEvents = () => {
  return {
    queryKey: ['mini-events'],
    queryFn: async () => {
      const response = await customFetch.get('/mini-events', { withCredentials: true });
      return response.data.miniEvents;
    }
  };
};
const getAllFinishs = () => {
  return {
    queryKey: ['fight-finish'],
    queryFn: async () => {
      const response = await customFetch.get('/fightFinish', { withCredentials: true });
      return response.data;
    }
  };
};
const getAllFighters = () => {
  return {
    queryKey: ['fighters'],
    queryFn: async () => {
      const response = await customFetch.get('/fighters', { withCredentials: true });
      return response.data;
    }
  };
};
const getOneFight = (id) => {
  return {
    queryKey: ['fight', id],
    queryFn: async () => {
      const response = await customFetch.get('/fights/' + id, { withCredentials: true });
      return response.data;
    }
  };
};
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
  await queryClient.ensureQueryData(getAllMiniEvents());
  await queryClient.ensureQueryData(getAllEvents());
  await queryClient.ensureQueryData(getAllRefers());
  await queryClient.ensureQueryData(getAllFinishs());
  await queryClient.ensureQueryData(getAllFighters());
  await queryClient.ensureQueryData(getOneFight(params.id));
  await queryClient.ensureQueryData(getAllWeightClasses());
  return params.id
}

export const action =
  (queryClient) =>
    async ({ request, params }) => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      console.log(data);

      try {
        const response = await customFetch.patch('/fights/' + params.id, data);
        console.log(response);
        queryClient.invalidateQueries(['fights']);
        toast.success(' Fight updated successfully ');
        return redirect('/fights');
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    };

const UpdateFight = () => {
  const id = useLoaderData()
  const { data } = useQuery(getAllEvents())
  const { data: data1 } = useQuery(getAllMiniEvents())
  const { data: data2 } = useQuery(getAllRefers())
  const { data: data3 } = useQuery(getAllFinishs())
  const { data: data4 } = useQuery(getAllFighters())
  const { data: data5 } = useQuery(getOneFight(id))
  const { data: data6 } = useQuery(getAllWeightClasses())
  const {
    miniEventID,
    fighter1ID,
    fighter2ID,
    winnerID,
    round,
    minute,
    seconds,
    finishID,
    refereeID,
    weightClassID,
    eventID,
  } = data5.fight;

  const events = data;
  const miniEvents = data1;
  const refers = data2.refers;
  const finishs = data3.fightFinishs
  const fighters = data4?.fighters?.filter((item) => item.weightClass._id === weightClassID);
  const weightClasses = data6.weightClasses;


  return (
    <Form method="post" className="form">
      <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '1rem' }} >Update  Fight</h2>
      <Wrapper>
        <div className="form-row">
          <label htmlFor='weightClassID' className="form-label">Weight class</label>
          <select name='weightClassID' id='weightClassID' className='form-select'
            defaultValue={weightClassID}>
            {weightClasses.map((item) => {
              return <option key={item._id} value={item._id}>{item.className}</option>
            })}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor='fighter1ID' className="form-label">Fighter 1</label>
          <select name='fighter1ID' id='fighter1ID' className='form-select'
            defaultValue={fighter1ID}>
            {fighters.map((item) => {
              return <option key={item._id} value={item._id}>{item.fighterName}</option>
            })}
          </select>
        </div>

        <div className="form-row">
          <label htmlFor='fighter2ID' className="form-label">Fighter 2</label>
          <select name='fighter2ID' id='fighter2ID' className='form-select'
            defaultValue={fighter2ID}>
            {fighters.map((item) => {
              return <option key={item._id} value={item._id}>{item.fighterName}</option>
            })}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor='eventID' className="form-label">Event </label>
          <select name='eventID' id='eventID' className='form-select'
            defaultValue={events.find((item) => item._id == eventID)?._id}>
            {events.map((item) => {
              return <option key={item._id} value={item._id}>{item.name}</option>
            })}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor='miniEventID' className="form-label">Mini event </label>
          <select name='miniEventID' id='miniEventID' className='form-select'
            defaultValue={miniEvents.find((item) => item._id == miniEventID)?._id}>
            {miniEvents.map((item) => {
              return <option key={item._id} value={item._id}>{item.name}</option>
            })}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor='refereeID' className="form-label">Referee </label>
          <select name='refereeID' id='miniEventID' className='form-select'
            defaultValue={refers.find(item => item._id === refereeID)?._id}>
            {refers.map((item) => {
              return <option key={item._id} value={item._id}>{item.name}</option>
            })}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor='winnerID' className="form-label">winner</label>
          <select name='winnerID' id='winnerID' className='form-select'
            defaultValue={winnerID ? winnerID : ''}>
            {fighters.map((item) => {
              return <option key={item._id} value={item._id}>{item.fighterName}</option>
            })}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor='finishID' className="form-label">Finish Type</label>
          <select name='finishID' id='finishID' className='form-select'
            defaultValue={finishID ? finishs.find((item) => item._id === finishID)?._id : finishs[0]?._id}>
            {finishs.map((item) => {
              return <option key={item._id} value={item._id}>{item.finishType}</option>
            })}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="round" className="form-label">Round</label>
          <input type="number" className="form-input" name='round' defaultValue={round} required />
        </div>
        <div className="form-row">
          <label htmlFor="minute" className="form-label">minute</label>
          <input type="text" className="form-input" name='minute' defaultValue={minute} required />
        </div>
        <div className="form-row">
          <label htmlFor="seconds" className="form-label">seconds</label>
          <input type="number" className="form-input" name='seconds' defaultValue={seconds} required />
        </div>
        <button type="submit" className='btn-css btn-block'>Submit</button>
      </Wrapper>
    </Form>
  );
};
const Wrapper = styled.div`
     @media (min-width: 1000px){
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 1rem;
        max-width: 800px;
        h2{
            grid-column: 1 / -1;
        }
        button{
          margin-bottom: -13px;
        }
   }
`
export default UpdateFight;
