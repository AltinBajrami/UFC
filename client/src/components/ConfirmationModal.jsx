import React from 'react';
import styled from 'styled-components';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (isOpen) {
        return (
            <Wrapper>
                <div className='modal-center' >
                    <h3>Are you sure you want to do this?</h3>
                    <div className="btns">
                        <button onClick={onConfirm} className='btn-css'>Yes,i do</button>
                        <button onClick={onClose} className='btn-css'>Cancel</button>
                    </div>
                </div>
            </Wrapper>
        )
    }
};

const Wrapper = styled.div`
    background: rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    transition: var(--transition);
    .modal-center{
        background: white;
        max-width: 450px;
        transition: var(--transition);
        border-radius: var(--borderRadius);
        padding: 1rem 3rem;
    }
    h3{
        letter-spacing: 2px;
    }
    .btns{
        display: flex;
        justify-content: center;
        gap: 1rem;
    }
`

export default ConfirmationModal;
