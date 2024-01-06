import axios from "axios"

export const loginAdmin = async (data) => {
    return await axios.post('/api/v1/admin/login',data)
}

export const getAdminPanel = async()=>{
    return await axios.get('/api/v1/admin/panel')
}

export const logoutAdmin = async (data) => {
    return await axios.put('/api/v1/admin/logout')
}