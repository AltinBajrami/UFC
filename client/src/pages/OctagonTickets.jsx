import React, { useEffect, useState } from 'react'
import customFetch from '../utils'
import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Seats from '../components/Seats';
import SelectedSeats from '../components/SelectedSeats';
import { loadStripe } from '@stripe/stripe-js'

export const loader = (queryClient) => async ({ params }) => {
    try {
        const { data } = await customFetch(`/events/${params.eventId}`, { withCredentials: true });
        const response = await customFetch('/seatingLayout/arena/' + data?.arenaid)
        const seatingLayouts = response?.data?.seatingLayouts;
        return { seatingLayouts, eventId: params.eventId, image: data.image, name: data.name }
    } catch (error) {
        toast.error('Failed to load events tickets,please try later')
        return redirect('/events')
    }
}

const OctagonTickets = () => {
    const { seatingLayouts, eventId, image, name } = useLoaderData()
    const [seatingLayout, setSeatingLayout] = useState(seatingLayouts[0])
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [occupiedSeats, setOccupiedSeats] = useState([]);

    const handleOnChangeSelect = (value) => {
        setSeatingLayout(seatingLayouts.find((item) => item.sectionName.toLowerCase() === value.toLowerCase()))
        setSelectedSeats([])
    }

    const handleBuyButton = async () => {
        const stripe = await loadStripe('pk_test_51OdDEELJvWI9WaXNfpv6F9Cu7Fe8DBHGlJYuFYDoNuDzb7uEBYwesH1oalL3mfeUctywZujS090gyHzPTA2h7vBt006mQwku3w');
        const body = { tickets: selectedSeats, eventId, seatingLayoutId: seatingLayout._id, image, name };
        try {
            const { data } = await customFetch.post('/tickets', body, { withCredentials: true });

            const result = await stripe.redirectToCheckout({
                sessionId: data?.id
            })

        } catch (error) {
            toast.error('Failed to fetch seats,please try later')
            console.log(error);
            return redirect('/events')
        }
    }

    useEffect(() => {
        const getOccupiedSeats = async () => {
            const { data } = await customFetch(`/tickets/${eventId}/seatingLayout/${seatingLayout._id}`)
            setOccupiedSeats(data?.occupiedSeats)
        }
        getOccupiedSeats()
    }, [seatingLayout])

    return (
        <Wrapper rows={seatingLayout.row}>
            <div className="select-list">
                <h5>Select Stand</h5>
                <select onChange={(e) => handleOnChangeSelect(e.target.value)}>
                    {seatingLayouts.map(item => {
                        return <option key={item._id} value={item.sectionName}>{item.sectionName}</option>
                    })}
                </select>
                <div className="selected-seats">
                    <SelectedSeats selectedSeats={selectedSeats} />
                </div>
                {selectedSeats.length > 0 && <button onClick={handleBuyButton} className="btn">Order Now</button>}
            </div>

            <div className="react-seat">
                <Seats selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats}
                    seatingLayout={seatingLayout} occupiedSeats={occupiedSeats} />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    display: grid;
    padding: 5rem 2rem;
    grid-template-rows: auto 1fr;
    h5{
        margin-bottom: 0.5rem;
        color: var(--grey-700);
        letter-spacing: var(--letterSpacing);
    }
   select{
    background-color: aliceblue;
    border: transparent;
    width: 120px;
    height: 30px;
    text-transform:capitalize;
   }
   .selected-seats{
    margin-top: 2rem;
   }
   .select-list{
    text-align: center;
   }
   @media (min-width: 970px){
    grid-template-columns:300px  1fr;
    column-gap: 2rem;
   }
   button{
        background-color: aliceblue;
        color: black;
    }
    button:hover{
        color: black;
        background-color: #dbedfd;
    }
`;

export default OctagonTickets;
