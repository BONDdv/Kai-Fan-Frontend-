import axios from "axios";
const URL = import.meta.env.VITE_API_URL



export const payment = async (token)=> await axios.post(`${URL}/api/user/create-payment`,
    {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
