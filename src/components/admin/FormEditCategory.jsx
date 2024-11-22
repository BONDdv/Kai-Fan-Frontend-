import React, { useEffect, useState } from 'react'
import useFoodStore from '../../store/food-store'

import { toast } from 'react-toastify'

import { useParams, useNavigate, Link } from 'react-router-dom'
import { readCategory, updateCategory } from '../../api/Category'
import UploadfileForCategory from './UploadfileForCategory'



const initialState = {
    name: "",
    image: [],
    menu: []
}



const FormEditCategory = () => {
    const { id } = useParams()
    const token = useFoodStore((state) => state.token)
    const getCategory = useFoodStore((state) => state.getCategory)
    const categories = useFoodStore((state) => state.categories)
    const navigate = useNavigate()




    const [form, setForm] = useState(initialState)

    useEffect(() => {
        getCategory()
        fetchCategory(token, id, form)
    }, [token, id])

    const fetchCategory = async (token, id, form) => {
        try {
            const res = await readCategory(token, id, form)
            // console.log( "res id form backend--->",form)
            setForm(res.data)
        } catch (err) {
            console.log("Error fetch data", err)
        }
    }

    const hdlOnChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        // console.log(form)
    }

    const hdlSubmit = async (e) => {

        e.preventDefault()
        try {
            const res = await updateCategory(token, id, form)
            // console.log(res)
            toast.success(`เพิ่มเมนู ${res.data.name} สำเร็จ`)
            navigate('/admin/category')
        } catch (err) {
            console.log(err)
        }

    }



// console.log("form test" , form)

    return (
        <div className='container mx-auto p-4 bg-gray-300 '>
            <form onSubmit={hdlSubmit}>
                <h1>เพิ่มหมวดหมู่รายการอาหาร</h1>
                <input className='w-full bg-white placeholder:text-yellow-400 text-black text-sm border  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-yellow-500 hover:border-red-300 shadow-sm focus:shadow mb-2'
                    value={form.name}
                    onChange={hdlOnChange}
                    placeholder='Title'
                    name='name'
                />
                
              

                <hr />

                <UploadfileForCategory form={form} setForm={setForm} />



                <div className='flex py-2 justify-center hover:scale-110'>
                    
                    <button
                       

                        className="text-white bg-green-600 hover:bg-green-500 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 "

                    >
                        บันทึกการแก้ไขรายการเมนู
                    </button>

                    


                </div>







                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

                </div>




            </form>
            <div className='flex justify-center  hover:scale-110'>
                <Link to={'/admin/category'}>
                    <button

                        className="text-white bg-red-600 hover:bg-red-500 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 "

                    >
                        ยกเลิกการแก้ไข
                    </button>

                </Link>
            </div>


        </div>
    )
}

export default FormEditCategory