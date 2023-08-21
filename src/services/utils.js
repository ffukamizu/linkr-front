import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.REACT_APP_API_URL;

export const server = axios.create({
  baseURL: API_URL,
});