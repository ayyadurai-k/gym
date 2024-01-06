import axios from "axios"
export const createMember = async (data) => {
    return await axios.post("/api/v1/member/create", data)
}

export const fetchMembers = async (data) => {
    let res;
    try {
        res = await axios.get("/api/v1/member/fetch-members")
    }
    catch (err) {
        console.log(err);
    }
    return res.data.data;
}