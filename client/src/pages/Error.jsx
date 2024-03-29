import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import styled from 'styled-components'
import img from '../assets/not-found.svg';

const Error = () => {
    const error = useRouteError()
    console.log(error);

    if (error.status === 404) {
        return <Wrapper>
            <div>
                <img src={img} alt="not found" />
                <h3>Ohh!</h3>
                <p>We can't seem to find page your are looking for</p>
                <Link to={'/'}  >back home</Link>
            </div>
        </Wrapper>
    }

    return <Wrapper>
        <h3>Something Went wrong</h3>
    </Wrapper>
}



const Wrapper = styled.div`
 min-height:100vh;
 text-align: center;
 display: flex;
 align-items: center;
 justify-content: center;
 img{
    width: 90vw;
    max-width: 600px;   
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
 }
 h3{
    margin-bottom: 0.5rem;
 }
 p{
    line-height: 2;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    color: var(--grey-500);
 }
 a{
    background: var(--primary-500);
    padding: 0.5rem 0.75rem;
    border-radius:var(--borderRadius);
    color: white;
    text-transform: capitalize;
 }
`
export default Error