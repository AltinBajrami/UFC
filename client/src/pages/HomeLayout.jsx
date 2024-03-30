import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import SubMenu from '../components/SubMenu'
const Home = () => {
    return <>
        <Navbar />
        <Outlet />
        <Sidebar />
        <SubMenu />
    </>
}

export default Home