import React from 'react'
import styled from 'styled-components'

const ZoomInAndOutButtons = ({ handleZoomOut, handleZoomIn }) => {
    return (
        <Wrapper>
            <button type='button' className='btn-css' onClick={handleZoomIn}>Zoom in</button>
            <button type='button' className='btn-css' onClick={handleZoomOut}>Zoom out</button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 1rem;
    display: flex;
    gap: 1rem;
    button{
        background-color: aliceblue;
        color: black;
    }
    button:hover{
        color: black;
        background-color: #dbedfd;
    }
`

export default ZoomInAndOutButtons