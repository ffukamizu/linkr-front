import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const server = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});