import axios from "axios";



export const createCategory = async (token ,form) => {

    return axios.post('http://localhost:9000/api/category', form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const listCategory = async (count = 100 ) => {

    return axios.get('http://localhost:9000/api/categoryAll/' + count
)}

export const readCategory = async (token,id) => {
    return axios.get('http://localhost:9000/api/category/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const removeCategory = async (token, id) => {
    return axios.delete('http://localhost:9000/api/category/' + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const updateCategory = async (token, id, form) => {
    return axios.put('http://localhost:9000/api/category/' + id, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const uploadImgCategory = async (token, form) => {

    return axios.post('http://localhost:9000/api/images-category', {
        image: form
    },{
        headers: {
            Authorization: `Bearer ${token}` 
        }
    })
}
export const removeImgCategory = async (token, public_id) => {

    return axios.post('http://localhost:9000/api/remove-images-category', {
        public_id
    },{
        headers: {
            Authorization: `Bearer ${token}` 
        }
    })
}
