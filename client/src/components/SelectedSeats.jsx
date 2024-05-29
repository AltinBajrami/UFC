import React from 'react'
import styled from 'styled-components';

const SelectedSeats = ({ selectedSeats }) => {
    if (selectedSeats.length === 0) {
        return <Wrapper>
            <h5>Selected Seats:</h5>
            <p>no seats selected</p>
        </Wrapper>
    }
    return (
        <Wrapper>
            <h5>Selected Seats:</h5>
            <ul>
                {selectedSeats.map((item) => {
                    const { rowId, columnId } = item;
                    return <li key={`${rowId}-${columnId}`}>
                        Row {rowId}, Column {columnId}
                    </li>
                })}
            </ul>
            <h5>price:  <span>{selectedSeats.length * selectedSeats[0].price}$</span></h5>
        </Wrapper>
    )
}
const Wrapper = styled.div`
ul{
    padding-left:0;
}
`

export default SelectedSeats
