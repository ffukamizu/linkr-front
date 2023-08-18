import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

async function signUp(body){
    const promise = await axios.post(`${API_URL}/signup`, body)
    return promise
}

const apiAuth = {signUp}

export default apiAuth