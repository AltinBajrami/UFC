import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useAppContext } from '../context/AppContext'
import sublinks from '../data'
import MenuDropDown from './MenuDropDown'

const Sidebar = () => {
    const { isSidebarOpen, setPageId, toggleSidebar, user, logoutUser } = useAppContext();

    return <Wrapper className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}>
        <div className="nav-links ">
            <div>
                <MenuDropDown toggleSidebar={toggleSidebar} user={user} />
            </div>
            {
                sublinks.map(({ page, pageId }) => {
                    return <NavLink key={pageId} to={`/${page}`} onClick={toggleSidebar}
                        className='nav-link'>{page}</NavLink>
                })
            }
            <div>
                {user ?
                    <> <NavLink onClick={logoutUser} to={'/'} className='nav-link'  >Logout</NavLink></>
                    :
                    <div className='auth-links'> <NavLink to={'/login'} onClick={toggleSidebar} className='nav-link'  >Login</NavLink>
                        <NavLink to={'/register'} className='nav-link' onClick={toggleSidebar} >Register</NavLink></div>
                }
            </div>
        </div >
    </Wrapper >
}
const Wrapper = styled.aside`
    .nav-links{
        padding: 3rem 0;
        display: grid;
        gap:2rem
    }
    .auth-links{
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

    .dropdown button{
        font-size: 1.5rem;
        text-transform: uppercase;
        color: var(--grey-900);
        transition: var(--transition);
        margin-bottom: 0px;
        padding: 0px;

    }
`
export default Sidebar