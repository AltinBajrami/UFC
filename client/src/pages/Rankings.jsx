import React from "react";
import styled from "styled-components";
import customFetch from "../utils";
import { Form, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SingleRanking from "../components/SingleRanking";

const getAllRankings = () => {
  return {
    queryKey: ['ranked'],
    queryFn: async () => {
      const { data } = await customFetch.get('/ranked');
      return data;
    }
  };
};
const getCurrentUser = () => {
  return {
    queryKey: ['currentUser'],
    queryFn: async () => {
      const { data } = await customFetch.get('/users/showMe');
      return data?.user;
    }
  };
};

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(getAllRankings(), getCurrentUser());
  return ''
}


const Rankings = () => {
  const { data } = useQuery(getAllRankings())
  const user = useQuery(getCurrentUser()).data;
  const rankings = data.ranked;


  return (
    <div>
      <Title>ATHLETE RANKINGS</Title>
      {user && user.role === 'admin' && (
        <CreateButton> <Link to="/ranked/create">Create a new ranking</Link></CreateButton>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Banner
          src="https://tpc.googlesyndication.com/simgad/945640650811365436"
          alt="Banner"
        />
      </div>
      <Wrapper>
        <div className="rankings">
          {rankings.map((rank) => (
            <div key={rank._id}>
              <SingleRanking rank={rank} user={user} />
            </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default Rankings;

const Wrapper = styled.div`
  padding: 20px;
  max-width: 1100px;
  margin: 0 auto;
 
  .champion{
    font-weight: bold;
    color: #191919;
    text-transform: uppercase;
    font-size: 18px;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 30px;
    a{
      text-decoration:none;
      color: #1e1e1e;
    }
  }
  .champion-span{
     color:#abadb1;
     font-size: 10px;
     text-transform: uppercasse;
     display: block;
     margin-top: 5px;
  }
  .rankings{
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 250px));
    place-content: center;
    gap: 20px;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 250px);
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 250px);
    }

    @media (max-width: 600px) {
      grid-template-columns: 250px;
    }
  }
  .weightClass{
    color: rgb(210, 10, 10);
    text-transform: uppercase;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 15px;
  }
  .athleteRows{
      height: 36px;
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 5px;
      border-radius: 8px;

    span {
      width: 35px;
      color: #191919;
      font-weight: bold;
      font-size: 14px;
    }
    a {
      color: rgb(88, 91, 99);
      font-size: 14px;
      line-height: 20px;
      text-decoration: none;
    }

    &:hover {
      background-color: #e5e5e5;
    }
  }
  .actions{
    display: flex;
    gap: 1rem;
    justify-content: start;
    align-items: center;
    a,button{
      border: transparent;
      text-transform: capitalize;
      color: var(--grey-600);
      text-decoration: none;
      background: none;
      transition: var(--transition);
    }
    button{
      color: red;
    }
    button:hover{
      color: #850707;
    }
    a:hover{
      color:black;
    }
  }
`;

const Title = styled.h2`
    text-align: center;
    margin-top: 50px;
    font-size: 60px;
    line-height: 60px;
    font-weight: 700;
    margin-bottom: 10px;
`

const Banner = styled.img`
  width: 100%;
  margin-bottom: 30px;
  margin-left: 10%;
  margin-right: 10%;
`;

const CreateButton = styled.div`
  margin: 30px 0;
  text-align: center;
  a{
    color: black;
    text-transform: capitalize;
    text-decoration: none;
    background-color: aliceblue;
    padding: 10px 20px;
    border-radius: 8px;
    transition: var(--transition);
  }
  a:hover{
    background-color: #d7edff
  }
  `