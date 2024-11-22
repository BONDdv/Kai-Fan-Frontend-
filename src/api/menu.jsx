import axios from "axios";



export const createMenu = async (token, form) => {

    return axios.post('http://localhost:9000/api/menu', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const listMenu = async (count = 100) => {

    return axios.get('http://localhost:9000/api/menus/' + count)
}
export const readMenu = async (token, id) => {

    return axios.get('http://localhost:9000/api/menu/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const deleteMenu = async (token, id) => {

    return axios.delete('http://localhost:9000/api/menu/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const updateMenu = async (token, id, form) => {

    return axios.put('http://localhost:9000/api/menu/' + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadFiles = async (token, form) => {
    
    // console.log('form api frontent', form) 
    return axios.post('http://localhost:9000/api/images', {
        image: form
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const removeFiles = async (token, public_id) => {
    
    // console.log('form api frontent', form) 
    return axios.post('http://localhost:9000/api/remove-images', {
        public_id
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchFillter = async (arg) => {

    return axios.post('http://localhost:9000/api/search/filters' ,arg)
}
