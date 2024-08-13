import React from 'react';
import styled from 'styled-components';

const Pagination = ({ pageCount, onPageChange, currentPage }) => {

    const renderPageNumbers = (pageCount, currentPage) => {
        const pages = [];
        const range = 1; // Number of pages to display around the current page
        const margin = 2; // Number of pages to display at the beginning and end

        // Add the first two pages
        for (let i = 1; i <= margin; i++) {
            if (i <= pageCount) {
                pages.push(i);
            }
        }

        // Add dots if there is a gap between the first pages and the current range
        if (currentPage > margin + range + 1) {
            pages.push('...');
        }

        // Add the range around the current page
        for (let i = Math.max(currentPage - range, margin + 1); i <= Math.min(currentPage + range, pageCount - margin); i++) {
            pages.push(i);
        }

        // Add dots if there is a gap between the current range and the last pages
        if (currentPage < pageCount - margin - range) {
            pages.push('...');
        }

        // Add the last two pages
        for (let i = pageCount - margin + 1; i <= pageCount; i++) {
            if (i > margin) {
                pages.push(i);
            }
        }

        return pages;
    };

    const handlePageClick = (data) => {
        onPageChange(data);
    };

    const pageNumbers = renderPageNumbers(pageCount, currentPage + 1);

    return (
        <Wrapper>
            <button
                onClick={() => handlePageClick({ selected: Math.max(currentPage - 1, 0) })}
                className={`centered pagination-previous ${currentPage === 0 ? 'pagination-disabled' : ''}`}
                disabled={currentPage === 0}
            >
                <p className='text'>previous</p>
            </button>
            {pageNumbers.map((page, index) =>
                page === '...' ? (
                    <span key={index} className="break-me">...</span>
                ) : (
                    <button
                        key={index}
                        onClick={() => handlePageClick({ selected: page - 1 })}
                        className={`pagination-page ${page === currentPage + 1 ? 'active' : ''}`}
                    >
                        {page}
                    </button>
                )
            )}
            <div className="pagination-info">
                <span className="current-page">{currentPage + 1}</span>
                <span className="page-count">/{pageCount}</span>
            </div>
            <button
                onClick={() => handlePageClick({ selected: Math.min(currentPage + 1, pageCount - 1) })}
                className={`centered pagination-next ${currentPage === pageCount - 1 ? 'pagination-disabled' : ''}`}
                disabled={currentPage === pageCount - 1}
            >
                <p className='text'>Next</p>
            </button>
        </Wrapper>
    );
};

const Wrapper = styled.div`

    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin-top: 1rem;

    .pagination-page,
    .pagination-previous,
    .pagination-next,
    .break-me {
        cursor: pointer;
        padding: 0;
        border: 1px solid #C2C7CF;
        transition: background-color 0.3s ease, color 0.3s ease;
        font-weight: bold;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 18px;
        background-color: #fff;
        margin-left: -1px;
        

        &:hover {
            background-color: #C2C7CF;
        }
    }

    .pagination-next {
        border-radius: 0 10px 10px 0;
    }

    .pagination-previous {
        border-radius: 10px 0 0 10px;
    }

    .pagination-disabled {
        cursor: not-allowed;
        color: #ddd;
        .arrow {
            opacity: 0.3;
        }
    }

    .active {
        background-color: #CEE5FF;
    }

    .pagination-info {
        display: none;
    }

    @media (max-width: 800px) {
        .pagination-page,
        .break-me {
            display: none;
        }

        .pagination-info {
            display: flex;
            align-items: center;
            padding: 0 10px;
            font-weight: bold;
            border: 1px solid #C2C7CF;
            margin-left: -1px;
            .page-count {
                font-weight: bold;
                color: #adadad // Set the color to grey
            }

            .current-page {
                font-weight: bold;
                color: inherit; // Keep the current color
            }
        }

        .pagination-previous {
            left: 10px;
            .text {
                display: none;
            }
        }

        .pagination-next {
            right: 10px;
            .text {
                display: none;
            }
        }
    }
`

export default Pagination;
