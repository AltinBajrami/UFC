import React from "react";
import customFetch from "../../utils";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const getAllFights = () => {
  return {
    queryKey: ['fights'],
    queryFn: async () => {
      const response = await customFetch.get('/fights', { withCredentials: true });
      return response.data;
    }
  }
}

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(getAllFights())
  return null;
}

const Fights = () => {

  const { data } = useQuery(getAllFights())
  const fights = data.fights
  console.log("🚀 ~ Fights ~ fights:", fights)

  const handleDelete = async (id) => {
    try {
      await customFetch.delete("/fights/" + id, { withCredentials: true });
      toast.success("Deleted fight");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting fight:", error);
      toast.error("Failed to delete fight");
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-100 bg-white rounded p-3">
        <Link to="/fights/create" className="btn btn-success">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Fighter 1</th>
              <th>Fighter 2</th>
              <th>Winner</th>
              <th>Round</th>
              <th>Finish Type</th>
              <th>Weight Class</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.fights.map((fight) => (
              <tr key={fights._id}>
                <td>
                  {fight.fighter1ID.fighterName}
                </td>
                <td>
                  {fight.fighter2ID.fighterName}
                </td>
                <td>
                  {fight.winnerID
                    ? `${fight.winnerID.fighterName}`
                    : "N/A"}
                </td>
                <td>{fight.round ? fight.round : 'N/A'}</td>
                <td>
                  {fight.finishID
                    ? `${fight.finishID.finishType} `
                    : "N/A"}
                </td>
                <td>
                  {fight.weightClassID.className}
                </td>
                <td>
                  <Link
                    to={`/fights/update/${fight._id}`}
                    className="btn btn-success"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(fight._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fights;
