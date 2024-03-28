import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
const Home = () => {
    return <>
        <Navbar />
        <Outlet />
        <Sidebar />
    </>
}

export default Home