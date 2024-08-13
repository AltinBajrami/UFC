import axios from 'axios';
import styled from 'styled-components';

const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
});

export default customFetch;

export const getUniqueValues = (data, type) => {
  let unique = data.map(item => item[type].toLowerCase());
  return ['all', ...new Set(unique)];
};

export const TableWrapper = styled.div`
  .scroll {
    overflow-x: auto;
  }
  max-width: 100%;
  margin-bottom: 5rem;
  table {
    width: 90%;
    margin: 5rem auto;
    border-collapse: collapse;
    margin-bottom: 0;
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }
`;
