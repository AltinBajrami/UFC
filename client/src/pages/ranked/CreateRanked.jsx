import React, { useEffect, useState } from "react";
import { Form, redirect, useNavigate } from "react-router-dom";
import customFetch from "../../utils";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const getAllWeightClasses = () => {
  return {
    queryKey: ['weightClasses'],
    queryFn: async () => {
      const response = await customFetch.get('/weightClasses');
      return response.data?.weightClasses || [];
    }
  }
}
const getAllFighters = () => {
  return {
    queryKey: ['fighters'],
    queryFn: async () => {
      const response = await customFetch.get('/fighters');
      return response.data?.fighters || [];
    }
  };
};

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(getAllWeightClasses(), getAllFighters());
  return ''
}

export const action =
  (queryClient) =>
    async ({ request }) => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      try {
        await customFetch.post('/ranked', data);
        queryClient.invalidateQueries(['ranked']);
        toast.success(' Ranked added successfully ');
        return redirect('/rankings');
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    };

const CreateRanked = () => {
  const { data: fightersData } = useQuery(getAllFighters())
  const { data: weightClassData } = useQuery(getAllWeightClasses())
  const [fighters, setFighters] = useState(fightersData);

  const handleWeightClassChange = (e) => {
    setFighters(fightersData.filter(f => f.weightClass._id === e.target.value));
  }

  return (
    <Form className="form" method="post" >
      <h2 className="formHeader">Create Ranked Fighters</h2>
      <div className="form-row">
        <label htmlFor="weightClass">Select Weight Class</label>
        <select
          name="weightClass"
          defaultValue={weightClassData?.[0]?._id}
          className="form-select"
          onChange={handleWeightClassChange}
        >
          {weightClassData.map((weightClass) => (
            <option key={weightClass._id} value={weightClass._id}>
              {weightClass.className}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label htmlFor="champion">Champion</label>
        <select
          className="form-select"
          defaultValue={fighters?.[0]?._id}
          name="champion"
        >
          <option value="">Select Champion</option>
          {fighters?.length > 0 && fighters.map((fighter) => (
            <option key={fighter._id} value={fighter._id}>
              {fighter.fighterName} ({fighter.nickName})
            </option>
          ))}
        </select>
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rank) => (
        <div key={rank} className="form-row">
          <label htmlFor={`rank${rank}`}>Rank {rank}</label>
          <select
            className="form-select"
            defaultValue={fighters?.[`rank${rank}`] || ""}
            name={`rank${rank}`}
          >
            <option value="">Select Fighter</option>
            {fighters?.length > 0 && fighters.map((fighter) => (
              <option key={fighter._id} value={fighter._id}>
                {fighter.fighterName} ({fighter.nickName})
              </option>
            ))}
          </select>
        </div>
      ))}
      <button type="submit" className="btn-css btn-block">
        Create
      </button>
    </Form>
  );
};

export default CreateRanked;
