import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export default customFetch;

export const getUniqueValues = (data, type) => {
  let unique = data.map(item => item[type]);
  return ['all', ...new Set(unique)];
};
