import axios from "axios";
const URL = import.meta.env.VITE_API_URL



export const createCategory = async (token ,form) => {

    return axios.post(`${URL}/api/category`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const listCategory = async (count = 100 ) => {

    return axios.get(`${URL}/api/categoryAll/` + count
)}

export const readCategory = async (token,id) => {
    return axios.get(`${URL}/api/category/` + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCategory = async (token, id) => {
    return axios.delete(`${URL}/api/category/` + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const updateCategory = async (token, id, form) => {
    return axios.put(`${URL}/api/category/` + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadImgCategory = async (token, form) => {

    return axios.post(`${URL}/api/images-category`, {
        image: form
    },{
        headers: {
            Authorization: `Bearer ${token}` 
        }
    })
}
export const removeImgCategory = async (token, public_id) => {

    return axios.post(`${URL}/api/remove-images-category`, {
        public_id
    },{
        headers: {
            Authorization: `Bearer ${token}` 
        }
    })
}
