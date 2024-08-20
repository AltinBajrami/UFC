import React, { useEffect, useState } from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
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
const getSingleRanking = (id) => {
  return {
    queryKey: ['ranked', id],
    queryFn: async () => {
      const { data } = await customFetch('/ranked/' + id);
      return data.ranked || {}
    },
  };
};

export const loader = (queryClient) => async ({ params }) => {
  await queryClient.ensureQueryData(getAllWeightClasses());
  await queryClient.ensureQueryData(getAllFighters());
  await queryClient.ensureQueryData(getSingleRanking(params.id));
  return { id: params?.id };
}

export const action =
  (queryClient) =>
    async ({ request, params }) => {
      const formData = await request.formData();
      const data = Object.fromEntries(formData);
      console.log(data);

      try {
        await customFetch.patch('/ranked/' + params.id, data);
        queryClient.invalidateQueries(['ranked']);
        toast.success(' Ranked updated successfully ');
        return redirect('/rankings');
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
      }
    };

const UpdateRanked = () => {
  const { id } = useLoaderData();
  const ranked = useQuery(getSingleRanking(id)).data;
  const fightersData = useQuery(getAllFighters()).data;
  const weightClassData = useQuery(getAllWeightClasses()).data;
  const [fighters, setFighters] = useState(fightersData?.filter(f => f.weightClass._id
    === ranked?.weightClass?._id));




  return (
    <Form className="form" method="post" >
      <h2 className="formHeader">Update Ranked Fighters</h2>
      <div className="form-row">
        <label htmlFor="weightClass">Select Weight Class</label>
        <select
          name="weightClass"
          defaultValue={ranked?.weightClass?._id}
          className="form-select"
          disabled
        >
          {weightClassData?.map((weightClass) => (
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
          defaultValue={ranked?.champion?._id}
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
            defaultValue={ranked?.[`rank${rank}`]?._id || ""}
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
      <button type="submit" className="btn btn-success">
        update
      </button>
    </Form>
  );
};

export default UpdateRanked;
