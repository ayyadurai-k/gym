import axios from "axios";

export const createExpence = async (data) => {
    return await axios.post("/api/v1/expence/create", data)
}

export const fetchExpence = async (data) => {
    let res;
    try {
        res = await axios.get("/api/v1/expence/fetch-expences")
    }
    catch (err) {
        console.log(err);
    }
    return res.data.data;
}