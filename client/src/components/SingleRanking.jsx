import React from 'react'
import { Link, Form } from 'react-router-dom'
import styled from 'styled-components'

const SingleRanking = ({ rank, user }) => {
    return (
        <Wrapper>
            <div className="weightClass">{rank.weightClass.className}</div>
            <div className="champion">
                <Link to={`/fighter/${rank.champion._id}`}> {rank.champion ? ` ${rank.champion.fighterName}` : "N/A"}</Link>
                <span
                    className="champion-span"
                >
                    Champion
                </span>
                {rank.champion.image1 ? (
                    <img
                        src={`http://localhost:5000${rank.champion.image1}`}
                        alt="Champion"
                        width="250"
                    />
                ) : (
                    <img
                        src="http://localhost:5000/uploads/fighters/no-profile-image.png"
                        alt="Champion"
                    />
                )}
            </div>
            {/* Loop through all ranks */}
            {[...Array(10).keys()].map((i) => (
                <div className="athleteRows" key={i}>
                    {rank[`rank${i + 1}`] ? (
                        <>
                            <span>{i + 1} </span>
                            <Link to={`/fighter/${rank[`rank${i + 1}`]._id}`}>{rank[`rank${i + 1}`].fighterName}</Link>
                        </>
                    ) : (
                        `N/A`
                    )}
                </div>
            ))}
            {user && user.role === 'admin' && (
                <div className="actions">
                    <Link to={`/ranked/update/${rank._id}`}>Edit</Link>
                    <Form method='post' action={`/rankings/${rank._id}`}>
                        <button type='submit' className='btn delete-btn'>Delete</button>
                    </Form>
                </div>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.article`
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
    img{
        height: 160px;
        object-fit: contain;
    }
  }
  .champion-span{
     color:#abadb1;
     font-size: 10px;
     text-transform: uppercasse;
     display: block;
     margin-top: 5px;
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
`

export default SingleRanking