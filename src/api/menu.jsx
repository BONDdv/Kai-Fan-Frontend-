import axios from "axios";
const URL = import.meta.env.VITE_API_URL


export const createMenu = async (token, form) => {

    return axios.post(`${URL}/api/menu`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const listMenu = async (count = 100) => {

    return axios.get(`${URL}/api/menus/` + count)
}
export const readMenu = async (token, id) => {

    return axios.get(`${URL}/api/menu/` + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const deleteMenu = async (token, id) => {

    return axios.delete(`${URL}/api/menu/` + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const updateMenu = async (token, id, form) => {

    return axios.put(`${URL}/api/menu/` + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadFiles = async (token, form) => {
    
    // console.log('form api frontent', form) 
    return axios.post(`${URL}/api/images`, {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const removeFiles = async (token, public_id) => {
    
    // console.log('form api frontent', form) 
    return axios.post(`${URL}/api/remove-images`, {
        public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchFillter = async (arg) => {

    return axios.post(`${URL}/api/search/filters` ,arg)
}
