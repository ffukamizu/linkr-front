import axios from 'axios';
import { API_URL } from './utils.js';

export const followService = (following, id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` }};

  if(following === false) {
    return axios.post(`${API_URL}/user/follow/${id}`, {}, config);
  } else {
    return axios.delete(`${API_URL}/user/follow/${id}`, config);
  };
};