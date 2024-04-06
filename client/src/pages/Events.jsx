import React, { useEffect } from 'react'
import axios from 'axios';

const Events = () => {

    // Function to set a cookie on the server
    const setCookie = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/users', {
                withCredentials: true
            });
            console.log(response);
            console.log('Cookie set successfully');
        } catch (error) {
            console.error('Error setting cookie:', error);
        }
    };

    useEffect(() => {
        setCookie();
    }, [])
    return (
        <div>Events</div>
    )
}

export default Events