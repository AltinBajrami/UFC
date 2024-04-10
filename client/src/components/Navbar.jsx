import React from 'react'
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { SiUfc } from "react-icons/si";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useAppContext } from '../context/AppContext';
import sublinks from '../data'
import { Dropdown } from 'react-bootstrap'

const Navbar = () => {
    const { isSidebarOpen, toggleSidebar, setPageId, user, logoutUser } = useAppContext()

    return <Wrapper>
        <div className="nav-center">
            <div className="nav-links">
                {
                    sublinks.map(({ page, pageId }) => {
                        return <NavLink key={pageId} to={`/${page}`} onMouseEnter={() => setPageId(pageId)} className='nav-link'>{page}</NavLink>
                    })
                }
            </div>
            <div className="icons" >
                <Link to={'/'}> <SiUfc className='logo' /></Link>
                <div className='toggle-nav' onClick={toggleSidebar}>Menu
                    {isSidebarOpen ? <FaArrowDown className='arrow' /> : <FaArrowUp className='arrow' />}</div>
            </div>
            <div className="auth-links">
                {user ?
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'start' }}>
                        <Dropdown>
                            <Dropdown.Toggle variant="" style={{ marginBottom: '0.5rem', textTransform: 'uppercase' }} id="admin-dropdown">
                                Menu
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item>
                                {user.role === 'admin' &&
                                    <>
                                        <Dropdown.Item as={NavLink} to="/users">Users</Dropdown.Item>
                                        <Dropdown.Item as={NavLink} to="/fightFinish">Fight Finish</Dropdown.Item>
                                        <Dropdown.Item as={NavLink} to="/weightClasses">Weight Classes</Dropdown.Item>
                                    </>
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        <NavLink to={'/'} className='auth-link' onClick={logoutUser}>logout</NavLink>
                    </div>
                    :
                    <> <NavLink to={'/login'} className='auth-link'  >Login</NavLink>
                        <NavLink to={'/register'} className='auth-link' >Register</NavLink></>
                }
            </div>
        </div>
    </Wrapper>
}

const Wrapper = styled.nav`
.dropdown-item.active {
    background-color: transparent !important;
    color: red !important; 
}
    background: white;
    color: black;
    z-index: 5;
    box-shadow: var(--shadow-1);
    .nav-center{
        width: 100vw;
        max-width: var(--max-width);
        display: grid;
        align-items: center;
        margin: 0 auto;
        height: 5rem;
        padding: 0 2rem;
   }
   .nav-links,.auth-links{
    display: none;
   }
   .icons{
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    cursor: pointer;
   }
   
   .logo{
    font-size: 3.5rem;
    transition: var(--transition);
    color: black;
   }
   .toggle-nav{
    justify-self: end;
    font-size: 1.2rem;
    text-transform: uppercase;
    display: flex;
    gap: 0.3rem;
    align-items: center;
    transition: 1s all ease-in-out;
    }
   .arrow{
    font-size: 1rem;
   }
   .logo:hover{
    color: red;
    border-bottom: 2px solid red;
}
   @media (min-width: 900px){
    .nav-links,.auth-links{
        display: flex;
        gap: 1rem;
        font-size: 1rem;
        text-transform: uppercase;
    }
    .nav-center{
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: center;
    }
    .toggle-nav{
        display: none;
    }
    .icons{
        grid-template-columns: 1fr auto;
        justify-self: center;
    }
    .auth-links{
        justify-self: end;
    }
    .auth-link{
        text-decoration:none ;
    }
    .nav-link,.auth-link{
        transition: var(--transition);
        color: var(--grey-700);
        padding-bottom: 0.5rem;
    }
    .nav-link:hover,.auth-link:hover{
        color: red;
        border-bottom: 2px solid red;
    }
   }
   @media (min-width: 1100px){
    .nav-center{
        width: 90vw;
        border-radius: var(--borderRadius);
    }
   }
`

export default Navbar