import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAthleteContext } from '../context/AthletesContext'
import Athlete from '../components/Athlete'
import Filters from '../components/Filters'



const Athletes = () => {
    // const { data, isLoading, isError, error } = useQuery(getAllFighters());
    const { fetchAthletes, filteredAthletes, isLoading, isError, allAthletes } = useAthleteContext();
    let athletes = filteredAthletes;

    useEffect(() => {
        fetchAthletes()
    }, [])

    if (isLoading) {
        return <div className="loading">
        </div>
    }
    if (isError) {
        return <div className='page'>
            <h2>Error fetching athletes</h2>
        </div>
    }

    return (
        <Wrapper>
            <div className="filters">
                <Filters athletes={allAthletes} />
            </div>
            <div className="fighters">
                {
                    athletes.length === 0 ? <div>
                        <h2>no fighter found please reset filters</h2>
                    </div> :
                        athletes.map((item) => {
                            return <Athlete key={item._id} className='fighter' {...item} />
                        })
                }
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.section`
    display: grid;
    gap: 3rem 2rem;
    margin: 4rem auto;
    @media (min-width: 520px) {
        grid-template-columns: 200px 1fr;
    }
`
export default Athletes