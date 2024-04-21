
import React from 'react'
import { getUniqueValues } from '../utils'
import { useAthleteContext } from '../context/AthletesContext';
import styled from 'styled-components';

const Filters = ({ athletes }) => {
    const { filters: {
        status,
        text,
        country,
        gender,
        fightingStyle
    }, clearFilters, updateFilters } = useAthleteContext();

    const statuses = getUniqueValues(athletes, 'status');
    const fightingStyles = getUniqueValues(athletes, 'fightingStyle');
    const countries = getUniqueValues(athletes, 'country');
    const genders = getUniqueValues(athletes, 'gender');

    return (
        <Wrapper>
            <h3>Filters</h3>
            <div className='content'>
                <form onSubmit={(e) => e.preventDefault()}>
                    {/* search input */}
                    <div className='filter-control'>
                        <input
                            type='text'
                            name='text'
                            value={text}
                            placeholder='search'
                            onChange={updateFilters}
                            className='search-input'
                        />
                    </div>
                    {/* end of search input */}

                    {/* status */}
                    <div className='filter-control'>
                        <h5>status</h5>
                        <div>
                            {statuses.map((c, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={updateFilters}
                                        type='button'
                                        name='status'
                                        className={`${status === c.toLowerCase() ? 'active' : null
                                            }`}
                                    >
                                        {c}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                    {/* end of status */}
                    {/* country */}
                    <div className='filter-control'>
                        <h5>fighting Style</h5>
                        <select
                            name='fightingStyle'
                            value={fightingStyle}
                            onChange={updateFilters}
                            className='fightingStyle'
                        >
                            {fightingStyles.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    {/* end of country */}

                    <div className='filter-control'>
                        <h5>gender</h5>
                        <select
                            name='gender'
                            value={gender}
                            onChange={updateFilters}
                            className='gender'
                        >
                            {genders.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    {/* end of status */}
                    {/* country */}
                    <div className='filter-control'>
                        <h5>country</h5>
                        <select
                            name='country'
                            value={country}
                            onChange={updateFilters}
                            className='country'
                        >
                            {countries.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    {/* end of country */}

                </form>
                <button type='button' className='clear-btn' onClick={clearFilters}>
                    clear filters
                </button>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
        text-align: center;
    form{
       text-align: center;
    }
    padding: 1rem 1.5rem;
    .filter-control {
        margin-bottom: 1.25rem;
        h5 {
        margin-bottom: 0.5rem;
        color: var(--grey-700);
        letter-spacing: var(--letterSpacing);
        }
     }
  .search-input {
    padding: 0.5rem;
    background: var(--grey-100);
    border-radius: var(--borderRadius);
    border-color: transparent;
    letter-spacing: var(--letterSpacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em auto;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    letter-spacing: var(--letterSpacing);
    color: var(--grey-700);
    cursor: pointer;
  }
  .active {
    border-color: red;
  }
  .fightingStyle ,.country,.gender {
    background: var(--grey-100);
    border-radius: var(--borderRadius);
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem;
  }

  .clear-btn {
    background: var(--primary-500);
    color: var(--white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--borderRadius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters