import axios from "axios";


export const publishService = async (link, text, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` }};
  
  const body = { link };
  if(text) body.text = text;

  return await axios.post(`${process.env.REACT_APP_API_URL}/posts`, body, config);
};