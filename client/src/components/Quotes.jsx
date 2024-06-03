import React, { useState } from 'react'
import styled from 'styled-components'
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

const Quotes = ({ quotes }) => {
    const [index, setIndex] = useState(0);
    const { fighter, quote } = quotes[index];
    const { image1, fighterName } = fighter;

    const nextPerson = () => {
        setIndex((index + 1) % quotes.length)
    }
    const prevPerson = () => {
        setIndex((index - 1 + quotes.length) % quotes.length)
    }
    const randomPerson = () => {
        setIndex(Math.floor(Math.random() * quotes.length))
    }

    return (
        <Wrapper>
            <article className="review">
                <div className="img-container">
                    <img src={`http://localhost:5000/${image1}`} alt="name" className="person-img" />
                </div>
                <h4 className="author">{fighterName}</h4>
                <p className="info">{quote}</p>
                <div className="btn-container">
                    <button className="prev-btn" onClick={prevPerson}><FaChevronLeft /></button>
                    <button className="next-btn" onClick={nextPerson}><FaChevronRight /></button>
                </div>
                <button className="btn-main" onClick={randomPerson}>surprise me </button>
            </article>
        </Wrapper>
    )
}

export default Quotes

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;

.review {
  width: 90vw;
  max-width: var(--fixed-width);
  background: var(--white);
  padding: 1.5rem 2rem;
  box-shadow: var(--shadow-1);
  transition: var(--transition);
  text-align: center;
}
.review:hover {
  box-shadow: var(--shadow-3);
}

.img-container {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
}

.person-img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
}


.img-container::before {
  content: '';
  width: 100%;
  height: 100%;
  background: var(--primary-500);
  position: absolute;
  border-radius: 50%;
  top: 0rem;
  right: 0rem;
}
.author {
  margin-bottom: 0.5rem;
}
.job {
  text-transform: uppercase;
  color: var(--primary-500);
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  letter-spacing: var(--letterSpacing);
}

.info {
  margin-bottom: 0.75rem;
  line-height: 1.5;
  color: var(--grey-600);
}
.btn-container {
  margin-bottom: 1rem;
}
.prev-btn,
.next-btn {
    text-transform:capitalize;
  color:var(--primary-500);
  font-size: 1.25rem;
  background: transparent;
  border-color: transparent;
  margin: 0 0.5rem;
  transition: var(--transition);
  cursor: pointer;
}
.prev-btn:hover,
.next-btn:hover {
  color: var(--primary-500);
} 
`