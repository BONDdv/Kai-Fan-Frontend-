import axios from "axios";


export const payment = async (token)=> await axios.post('http://localhost:9000/api/user/create-payment',
    {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
