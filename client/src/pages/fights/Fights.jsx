import React, { useState } from "react";
import customFetch from "../../utils";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Pagination from "../../components/Pagination";

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
  const [fights, setFights] = useState(data.fights || []);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

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

  const handleSearch = (e) => {
    if (e.target.value) {
      const filteredFights = data.fights.filter((fight) =>
        fight.fighter1ID.fighterName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        fight.fighter2ID.fighterName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFights(filteredFights);
    } else {
      setFights(data.fights)
    }
    setCurrentPage(0)
  }

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const getPaginatedFights = () => {
    const offset = currentPage * itemsPerPage;
    return fights.slice(offset, offset + itemsPerPage);
  };

  return (
    <Wrapper>

      <div className="searchContainer">
        <Link to="/fights/create" className="btn btn-success">
          Add +
        </Link>
        <input type="text" onChange={handleSearch} placeholder='Search fighters' />
      </div>
      <div className="fights">
        {getPaginatedFights().map((fight) => {
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
      <Pagination
        pageCount={Math.ceil(fights.length / itemsPerPage)}
        onPageChange={handlePageClick}
        currentPage={currentPage}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
    min-height: 100vh;
    width: 100%;
  padding: 3rem 2rem;

  .searchContainer{
        display: flex;
        justify-content: center;
        gap:1rem;
        input{
            border-radius: var(--borderRadius);
            padding: 0.2rem 0.7rem;
        }
    }
  .fights{
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 600px));
    margin: 2rem auto;
    justify-content: center;
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