import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAthleteContext } from '../context/AthletesContext'
import Athlete from '../components/Athlete'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'



const Athletes = () => {
    // const { data, isLoading, isError, error } = useQuery(getAllFighters());
    const { fetchAthletes, filteredAthletes, isLoading, isError, allAthletes } = useAthleteContext();


    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;

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

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const getPaginatedAthletes = () => {
        const offset = currentPage * itemsPerPage;
        return filteredAthletes.slice(offset, offset + itemsPerPage);
    };

    return (
        <Wrapper>
            <div className="filters">
                <Filters athletes={allAthletes} setCurrentPage={setCurrentPage} />
            </div>
            <div className="fighters">
                {
                    getPaginatedAthletes().length === 0 ? <div>
                        <h2>no fighter found please reset filters</h2>
                    </div> : <>
                        {getPaginatedAthletes().map((item) => {
                            return <Athlete key={item._id} {...item} />
                        })}
                    </>

                }
                <div className="pagination">

                    <Pagination
                        pageCount={Math.ceil(filteredAthletes?.length / itemsPerPage)}
                        onPageChange={handlePageClick}
                        currentPage={currentPage}
                    />
                </div>
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
    .fighters{
        padding: 1rem;
        display: grid;
    }
    @media (min-width: 720px) {
        .fighters{
          padding: 2rem;
        }
    }
    @media (min-width: 992px) {
        .fighters{
            grid-template-columns: 1fr 1fr;
            column-gap: 2rem;
        }
    }
    @media (min-width: 1200px) {
        .fighters{
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    .pagination{
        display: block;
        grid-column: -3 / -1;
    }
`
export default Athletes