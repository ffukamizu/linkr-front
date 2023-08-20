import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

async function signIn(obj, success, failure) {
    axios
        .post(`${API_URL}/signin`, obj)
        .then((res) => {
            success(res.data);
        })
        .catch((error) => {
            alert(error.response.data);
            failure();
        });
}

async function signUp(body) {
    const promise = await axios.post(`${API_URL}/signup`, body);
    return promise;
}

const apiAuth = { signUp, signIn };

export default apiAuth;
