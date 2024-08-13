import React from "react";
import customFetch from "../../utils";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

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
    <Wrapper>
      <Link to="/fights/create" className="btn btn-success">
        Add +
      </Link>
      <div className="fights">
        {data.fights.map((fight) => {
          const { eventID, fighter1ID, fighter2ID, winnerID, finishID, weightClassID, round, seconds, minute } = fight;
          return <article key={fight._id} className="fight" >
            <h2>{eventID.name}</h2>
            <h4>{fighter1ID.fighterName} vs {fighter2ID.fighterName}</h4>
            <div className="info">
              <p>Weight Class: <span>{weightClassID.className}</span></p>
              <p>Winner: <span>{winnerID ? winnerID.fighterName : "N/A"}</span></p>
              {winnerID && <p className="time">Time: <span>{round} round, {minute} minute, {seconds} seconds</span></p>}
              {winnerID && <p className="method">Method: <span>{finishID.finishType}</span></p>}
            </div>
            <div className="actions">
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
            </div>
          </article>
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
    min-height: 100vh;
    width: 100%;
  padding: 3rem 2rem;
  .fights{
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    margin: 2rem 0;
  }
  .fight{
      background-color: var(--grey-50);
      box-shadow: 0px 0px 5px rgba(0, 0, 0,0.2);
      padding: 20px 30px;
      transition: background-color 0.3s ease-in-out;
      text-align: center;
      h2,h4{
        letter-spacing: var(--letterSpacing);
        font-weight: bold;
      }
      .info p{
        color:var(--grey-700);
        letter-spacing: var(--letterSpacing);
        margin-top: 1rem;
        span{
          font-weight: 500;
        }
      }
      .actions{
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
      }
    }
    .fight:hover{
      box-shadow: 0px 0px 7px rgba(0, 0, 0,0.2);
    }

`

export default Fights;

{/* <table className="table">
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
  {data.fights.map((fight, index) => (
    <tr key={index}>
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
</table> */}