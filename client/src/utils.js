import axios from 'axios';
import styled from 'styled-components';

const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
});

export default customFetch;

export const getUniqueValues = (data, type) => {
  let unique = data.map(item =>
    item[type].toLowerCase()
  );
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

export const FIGHTER_FIGHTING_STYLE = {
  BOXING: 'boxing',
  SAMBO: 'sambo',
  JIU_JITSU: 'jiu-jitsu',
  MMA: 'mma',
  MUAI_THAI: 'muai-thai',
  KICKBOXER: 'kickboxer',
  STRIKER: 'striker',
  WRESTLER: 'wrestler',
  FREE_STYLE: 'free-style',
};

export const GENDER = {
  MALE: 'Male',
  FEMALE: 'Female',
};

export const STATUS = {
  ACTIVE: 'active',
  RETIRED: 'retired',
};

export const MINI_EVENTS = {
  MAIN_EVENT: 'main event',
  PRELIMS: 'prelims',
  EARLY_PRELIMS: 'early prelims',
};
