import axios from "axios"

export const loginBranch = (data) => {
    return axios.post('/api/v1/branch/login', data, { withCredentials: true });
}
export const fetchBranches = async () => {
    let res
    try {
        res = await axios.get('/api/v1/branch/fetch-branches');
    }
    catch (err) {
        console.log(err);
    }
    return res.data.data
}
export const createBranch = async (data) => {
    return axios.post('/api/v1/branch/create', data);
}
export const fetchLoginBranch = async () => {
    return axios.get('/api/v1/branch/fetch-login-branch');
}