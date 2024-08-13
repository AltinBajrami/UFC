import React, { useEffect, useState } from 'react'
import customFetch from '../../utils'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ConfirmationModal from '../../components/ConfirmationModal'

const getAll = () => {
    return {
        queryKey: ['fighters'],
        queryFn: async () => {
            const response = await customFetch.get('/fighters', { withCredentials: true });
            return response.data.fighters;
        }
    };
};

export const loader = (queryClient) => async () => {
    await queryClient.ensureQueryData(getAll());
    return '';
};

const Fighters = () => {
    const { data } = useQuery(getAll());

    const [fighters, setFighters] = useState(data || [])
    const [deleteItemId, setDeleteItemId] = useState(null);
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: (id) => customFetch.delete(`/fighters/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(['fighters']);
            toast.success('Deleted successfully');
            setFighters(fighters.filter(fighter => fighter._id !== deleteItemId))
            setDeleteItemId(null);
        },
        onError: (error) => {
            setDeleteItemId(null);
            toast.error(error.response.data.msg);
        }
    });
    useEffect(() => {
        setFighters(data);
    }, [data]);

    const handleSearch = (e) => {
        if (e.target.value) {
            setFighters(data.filter(fighter => fighter.fighterName.toLowerCase().includes(
                e.target.value.toLowerCase())))
        } else {
            setFighters(data)
        }
    }

    const handleDelete = (id) => {
        setDeleteItemId(id)
        mutate(id)
    };
    return (
        <Wrapper>
            <div className="searchContainer">
                <Link to="/fighters/create" className='btn btn-success'>Add +</Link>
                <input type="text" onChange={handleSearch} placeholder='Search fighters' />
            </div>
            <div className="fighters">
                {fighters.map((fighter) => {

                    console.log(fighter);

                    return <article key={fighter._id} className="fighter" >
                        <h2>{fighter.fighterName}</h2>
                        <h4>{fighter.nickName}</h4>
                        <div className="info">
                            <p>Weight Class: <span>{fighter.weightClass.className}</span></p>
                            <p>Status: <span>{fighter.status}</span></p>
                            <p>Country: <span>{fighter?.country}</span></p>
                            <p>fighting Style: <span>{fighter.fightingStyle}</span></p>
                            <p>gender: <span>{fighter.gender}</span></p>

                        </div>
                        <div className="actions">
                            <Link
                                to={`/fighters/update/${fighter._id}`}
                                className="btn btn-success"
                            >
                                Update
                            </Link>
                            <button
                                className="btn btn-danger"
                                onClick={(e) => setDeleteItemId(fighter._id)}
                            >
                                Delete
                            </button>
                            <ConfirmationModal
                                isOpen={deleteItemId === fighter._id}
                                onClose={() => setDeleteItemId(null)}
                                onConfirm={() => handleDelete(fighter._id)}
                            />
                        </div>
                    </article>
                })}
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.section`
     min-height: 100vh;
    width: 100%;
    padding: 3rem 2rem;
    .searchContainer{
        display: flex;
        gap:1rem;
        input{
            border-radius: var(--borderRadius);
            padding: 0.2rem 0.7rem;
        }
    }
  .fighters{
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
    margin: 2rem 0;
  }
  .fighter{
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
        text-transform: capitalize;
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
export default Fighters