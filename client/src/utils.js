import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
});

export default customFetch;

export const getUniqueValues = (data, type) => {
  let unique = data.map(item => item[type].toLowerCase());
  return ['all', ...new Set(unique)];
};
