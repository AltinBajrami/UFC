import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import ZoomInAndOutButtons from './ZoomInAndOutButtons';

const Seats = ({ selectedSeats, setSelectedSeats, seatingLayout, occupiedSeats }) => {
    const [dimensions, setDimensions] = useState(20);
    const { row, column, price } = seatingLayout;

    const seatRows = Array.from({ length: row }, (_, index) => index + 1);

    const seatColumns = Array.from({ length: column }, (_, index) => index + 1);

    const handleSeatClick = (rowId, columnId) => {
        if (occupiedSeats.some(seat => seat.row === rowId.toString() && seat.column === columnId.toString())) {
            toast.error(`You can't select this ticket`);
            return;
        }

        console.log("🚀 ~ handleSeatClick ~:", occupiedSeats.includes({ row: rowId, column: columnId }))
        setSelectedSeats(prevSelectedSeats => {
            let newSelectedSeats = [...prevSelectedSeats];

            const seatClicked = { rowId, columnId, price };
            const isSeatSelected = newSelectedSeats.find((item) =>
                item.rowId === rowId && item.columnId === columnId)
            if (isSeatSelected) {
                newSelectedSeats = newSelectedSeats.filter(item =>
                    !(item.rowId === rowId && item.columnId === columnId)
                );
            } else {
                if (selectedSeats.length === 5) {
                    toast.error('You cannot select more than 5 tickets')
                    return newSelectedSeats;
                } else
                    newSelectedSeats.push(seatClicked);
            }
            console.log(newSelectedSeats);
            return newSelectedSeats;
        });
    };

    const handleZoomIn = () => {
        if (dimensions != 50) {
            setDimensions(dimensions + 5);
        };
    }

    const handleZoomOut = () => {
        if (dimensions != 5) {
            setDimensions(dimensions - 5);
        }
    };


    return (
        <Wrapper column={column} dimensions={dimensions}>
            <h2>Select Your Seats</h2>
            <>
                <div className="seat-grid">
                    {seatRows.map((rowId, index) => (
                        <div key={rowId} className="seat-row">
                            <p>Row {rowId}</p>
                            <div className="seats">
                                {seatColumns.map((columnId) => (
                                    <Seat
                                        key={columnId}
                                        className={`seat ${selectedSeats.find((item) =>
                                            item.rowId === rowId && item.columnId === columnId) ? 'selected' : ''} 
                                            ${occupiedSeats.find((item) =>
                                                item.row == rowId && item.column == columnId) ? 'disabled' : ''} `}
                                        onClick={() => handleSeatClick(rowId, columnId)}
                                    >
                                        {''}
                                    </Seat>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ >
            <ZoomInAndOutButtons handleZoomOut={handleZoomOut} handleZoomIn={handleZoomIn} />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-top: 20px;
    width: 90%;
    display: grid;
    grid-template-rows: auto 300px auto;
    @media (min-width:830px){
        grid-template-rows: auto 400px auto;
    }
    h2{
        margin-bottom: 1rem;
        color: var(--grey-700);
        letter-spacing: var(--letterSpacing);
    }
    .seat-grid {
        display: grid;
        grid-template-columns:auto;
        background-color: aliceblue;
        align-items: center;
        justify-content: start;
        padding: 1rem 2rem;
        border-radius: var(--borderRadius);
        overflow-x:auto;
        overflow-x:auto;
    }

    .seat-row {
        display: flex;
        align-items: center;
        justify-content: start;
    }
    .seat-row p{
        align-self:center;
        margin-right:1rem;
        font-weight: bold;
    }
    .seats{
        display: flex;
        align-items: center;
        justify-content: start;
        margin-top: -0.8rem;
    }
    .seat{
        width: ${props => `${props.dimensions}px`};
        height: ${props => `${props.dimensions}px`};
        border-radius: 50%;
    }
`;

const Seat = styled.div`
    width: 60px;
    height: 50px;
    background-color: #e2e2e2;
    border: 1px solid #ccc;
    margin: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &.selected {
        background-color: #6cb2eb;
    }
    &.disabled {
        background-color: red;
    }
`;

export default Seats;
