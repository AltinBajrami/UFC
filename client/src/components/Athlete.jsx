import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const Athlete = (props) => {
    const { fighterName, _id, win, lose, draw, homeTown, fightingStyle, country, nickName, image1, image2, weightClass: { className } } = props;
    return (
        <Wrapper>
            <div className="card">
                <div className="card-side card-front">
                    <div className="card-side card-front">
                        <div className="fighter-img">
                            <img src={`http://localhost:5000/` + image1} alt="fighterImage" />
                        </div>
                        <div className="fighter-info">
                            <p className="nickName">"{nickName}"</p>
                            <h5>{fighterName}</h5>
                            <p>{className}</p>
                            <p>{win}-{lose}-{draw} [W-L-D]</p>
                        </div>
                    </div>
                </div>
                <div className="card-side card-back">
                    <div className="fighter-info-back">
                        <p className="nickName">"{nickName}"</p>
                    </div>
                    <div className="fighter-img-back">
                        <img src={`http://localhost:5000/` + image2} alt="s" />
                    </div>
                    <Link to={'/fighter/' + _id} className='btn-profile'>Athlete Profile</Link>
                </div>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    background-color: var(--white);
    .card {
        height: 330px;
        position: relative;
        perspective: 1500px;
        border: none;
        margin-bottom: 3rem;
    }
    .card-side {
        transition: all 2s linear;
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: var(--borderRadius);
        text-align: center;
        padding: 1rem 0;
    }
    .card-front {
         background: var(--grey-50);
    }
    .card-back {
        background: var(--grey-50);
        display: grid;
        place-items: center;
        transform: rotateY(180deg);

    }
    .card:hover .card-front {
      transform: rotateY(-180deg);
    }
    .card:hover .card-back {
     transform: rotateY(0);
    }

    .fighter-img{
        border-bottom: 1px dotted rgba(0,0,0,0.3);
        img{
            max-height: 150px;
            filter: drop-shadow(0px 0px 10px rgba(0,0,0,0.5));
        }
    }
    .fighter-info{
        margin-top: 1rem;
    }
    .nickName{
        color: var(--grey-400);
        font-weight:bold;
        letter-spacing: 2px;
        text-transform:uppercase;
    }
    h5{
        letter-spacing: var(--letterSpacing);
        text-transform:uppercase;
        font-weight: bold;
    }
    p{
        letter-spacing: var(--letterSpacing);
        font-size: 0.9rem;
        color: var(--grey-700);
    }
    .fighter-info-back{
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
    }
    .fighter-img-back{
        img{
            height: 300px;
            max-height: 300px;
        }
    }
    .btn-profile{
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        color: white;
        background-color: black;
        letter-spacing: var(--letterSpacing);
        border-radius:var(--borderRadius);
        padding: 0.75rem 1rem;
        cursor: pointer;
        transition: var(--transition);
        transition-delay:0.1s;
        text-decoration: none;
       }
       .btn-profile:hover{
         border-bottom: 3px solid red;
         background-color: rgba(0,0,0,0.7);
       }
  
`

export default Athlete



