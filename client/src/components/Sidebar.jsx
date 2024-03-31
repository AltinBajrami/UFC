import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useAppContext } from '../context/AppContext'
import sublinks from '../data'
const Sidebar = () => {
    const { isSidebarOpen, setPageId } = useAppContext();

    return <Wrapper className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
        <div className="nav-links ">
            {
                sublinks.map(({ page, pageId }) => {
                    return <NavLink key={pageId} to={`/${page}`} onMouseEnter={() => setPageId(pageId)}
                        className='nav-link'>{page}</NavLink>
                })
            }
            <NavLink to={'/login'} className='nav-link'>Login</NavLink>
            <NavLink to={'/register'} className='nav-link'>Register</NavLink>
        </div>
    </Wrapper >
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