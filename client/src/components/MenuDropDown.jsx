import React from 'react'
import { Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'

const MenuDropDown = ({ toggleSidebar, user }) => {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="" style={{ textTransform: 'uppercase' }} id="admin-dropdown">
                Menu
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item as={NavLink} onClick={toggleSidebar} to="/profile">Profile</Dropdown.Item>
                {user?.role === 'admin' &&
                    <>
                        <Dropdown.Item as={NavLink} onClick={toggleSidebar} to="/users">Users</Dropdown.Item>
                        <Dropdown.Item as={NavLink} onClick={toggleSidebar} to="/fightFinish">Fight Finish</Dropdown.Item>
                        <Dropdown.Item as={NavLink} onClick={toggleSidebar} to="/weightClasses">Weight Classes</Dropdown.Item>
                        <Dropdown.Item as={NavLink} onClick={toggleSidebar} to="/fighters">Fighters</Dropdown.Item>
                        <Dropdown.Item as={NavLink} onClick={toggleSidebar} to="/refers">Refers</Dropdown.Item>
                        <Dropdown.Item as={NavLink} onClick={toggleSidebar} to="/quotes">Quotes</Dropdown.Item>
                        <Dropdown.Item as={NavLink} onClick={toggleSidebar} to="/fights">Fights</Dropdown.Item>
                        <Dropdown.Item as={NavLink} onClick={toggleSidebar} to="/arena">Arena</Dropdown.Item>
                        <Dropdown.Item as={NavLink} onClick={toggleSidebar} to="/mini-event">Mini-Event</Dropdown.Item>
                    </>
                }
            </Dropdown.Menu>
        </Dropdown >
    )
}

export default MenuDropDown