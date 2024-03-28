import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useAppContext } from '../context/AppContext'

const Sidebar = () => {
    const { isSidebarOpen } = useAppContext();

    return <Wrapper className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
        <div className="nav-links ">
            <NavLink to={'/events'} className='nav-link'>Events</NavLink>
            <NavLink to={'/rankings'} className='nav-link'>Rankings</NavLink>
            <NavLink to={'/athletes'} className='nav-link'>athletes</NavLink>
            <NavLink to={'/login'} className='nav-link'>Login</NavLink>
            <NavLink to={'/register'} className='nav-link'>Register</NavLink>
        </div>
    </Wrapper>
}
const Wrapper = styled.aside`

    .nav-links{
        padding: 3rem 0;
        display: grid;
        gap:2rem
    }
    .nav-link{
        display: block;
        font-size: 1.5rem;
        text-transform: uppercase;
        color: var(--grey-900);
        padding: 0 2rem;
        transition: var(--transition);
    }
    .nav-link:hover{
        color: red;
    }
`
export default Sidebar