import axios from 'axios';

console.log(process.env.REACT_APP_API_URL);
export const server = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});