import React, { useState } from 'react'
import customFetch from '../utils'
import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Seats from '../components/Seats';
import SelectedSeats from '../components/SelectedSeats';

export const loader = (queryClient) => async ({ params }) => {
    try {
        const { data } = await customFetch(`/events/${params.eventId}`);
        const response = await customFetch('/seatingLayout/arena/' + data?.event[0].arena)
        const seatingLayouts = response?.data?.seatingLayouts;
        console.log("🚀 ~ loader ~ seatingLayouts:", seatingLayouts)

        return { seatingLayouts }
    } catch (error) {
        toast.error('Failed to load events tickets,please try later')
        return redirect('/events')
    }
}

const OctagonTickets = () => {
    const { seatingLayouts } = useLoaderData()
    const [seatingLayout, setSeatingLayout] = useState(seatingLayouts[0])
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleOnChangeSelect = (value) => {
        setSeatingLayout(seatingLayouts.find((item) => item.sectionName.toLowerCase() === value.toLowerCase()))
        setSelectedSeats([])
    }

    return (
        <Wrapper>
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
                {selectedSeats.length > 0 && <button className="btn">Order Now</button>}
            </div>

            <div className="react-seat">
                <Seats selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} seatingLayout={seatingLayout} />
            </div>

        </Wrapper>
    );
};

const Wrapper = styled.section`
    display: grid;
    height: 100vh;
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
   /* @media (min-width: 600px){
    grid-template-columns:200px  1fr
   } */
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




// import React, { useState } from 'react'
// import customFetch from '../utils'
// import { redirect, useLoaderData } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import styled from 'styled-components';
// import Seats from '../components/Seats';
// import SelectedSeats from '../components/SelectedSeats';

// export const loader = (queryClient) => async ({ params }) => {
//     try {
//         const { data } = await customFetch(`/events/${params.eventId}`);
//         const response = await customFetch('/seatingLayout/arena/' + data?.event[0].arena)
//         const seatingLayouts = response?.data?.seatingLayouts;
//         console.log("🚀 ~ loader ~ seatingLayouts:", seatingLayouts)

//         return { seatingLayouts }
//     } catch (error) {
//         toast.error('Failed to load events tickets,please try later')
//         return redirect('/events')
//     }
// }

// const OctagonTickets = () => {
//     const { seatingLayouts } = useLoaderData()
//     const [seatingLayout, setSeatingLayout] = useState(seatingLayouts[0])
//     const [selectedSeats, setSelectedSeats] = useState([]);

//     const handleOnChangeSelect = (value) => {
//         setSeatingLayout(seatingLayouts.find((item) => item.sectionName.toLowerCase() === value.toLowerCase()))
//         setSelectedSeats([])
//     }

//     return (
//         <Wrapper>
//             <div className="select-list">
//                 <h5>Select Type</h5>
//                 <select onChange={(e) => handleOnChangeSelect(e.target.value)}>
//                     {seatingLayouts.map(item => {
//                         return <option key={item._id} value={item.sectionName}>{item.sectionName}</option>
//                     })}
//                 </select>
//                 <div className="selected-seats">
//                     <SelectedSeats selectedSeats={selectedSeats} />
//                 </div>
//             </div>

//             <div className="react-seat">
//                 <Seats selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} seatingLayout={seatingLayout} />
//             </div>

//         </Wrapper>
//     );
// };

// const Wrapper = styled.section`
//     display: grid;
//     height: 100vh;
//     padding: 5rem 2rem;
//     h5{
//         margin-bottom: 0.5rem;
//         color: var(--grey-700);
//         letter-spacing: var(--letterSpacing);
//     }
//    select{
//     background-color: aliceblue;
//     border: transparent;
//     width: 100px;
//     height: 30px;
//     text-transform:capitalize;
//    }
//    .selected-seats{
//     margin-top: 2rem;
//    }
//    @media (min-width: 600px){
//     grid-template-columns:200px  1fr
//    }
// `;



// export default OctagonTickets;