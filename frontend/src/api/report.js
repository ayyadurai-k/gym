import axios from "axios";

export const fetchReports = async () => {
    let res;
    try {
        res = await axios.get('/api/v1/report/fetch-reports');
    } catch (error) {
        console.log(error);
    }
    return res.data.data
}

export const sendReportEmail = async (data) => {
   return await axios.post('/api/v1/report/send-reports-email', data);
}

export const fetchExpires = async () => {
    let res
    try {
        res = await axios.get('/api/v1/report/fetch-expires');
    } catch (error) {
        console.log(error);
    }
    return res.data.data
}