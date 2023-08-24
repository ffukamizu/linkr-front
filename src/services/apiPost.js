import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const publishService = async (link, text, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` }};
  
  const body = { link };
  if(text) body.text = text;

  return await axios.post(`${API_URL}/posts`, body, config);
};

export const deleteService = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` }};

  return axios.delete(`${API_URL}/posts/${id}`, config);
};

export const editService = async (id, text, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` }};

  return axios.patch(`${API_URL}/posts/${id}`, { text }, config);
};

export const likePost = async (id,token) => {
  const config = { headers: { Authorization: `Bearer ${token}` }};

  return axios.post(`${API_URL}/likes`, {post:id} , config);
}

export const extractMetadata = async (url) => {
  return axios.get(`https://jsonlink.io/api/extract?url=${url}`);
};

export const repostService = async (id, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` }};

  return axios.post(`${API_URL}/re-post/${id}`, {}, config);
};