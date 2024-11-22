import React, { useEffect, useState } from 'react'
import useFoodStore from '../../store/food-store'
import { createMenu, readMenu, updateMenu } from '../../api/menu'
import { toast } from 'react-toastify'
import UploadFile from './UploadFile'
import { useParams, useNavigate, Link } from 'react-router-dom'



const initialState = {
    title: "",
    description: " ",
    price: "",
    quantity: "",
    categoryId: '',
    image: []
}



const FormEditMenu = () => {
    const { id } = useParams()
    const token = useFoodStore((state) => state.token)
    const getCategory = useFoodStore((state) => state.getCategory)
    const categories = useFoodStore((state) => state.categories)
    const navigate = useNavigate()




    const [form, setForm] = useState(initialState)

    useEffect(() => {
        getCategory()
        fetchMenu(token, id, form)
    }, [])

    const fetchMenu = async (token, id, form) => {
        try {
            const res = await readMenu(token, id, form)
            // console.log( "res id form backend--->",res)
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
            const res = await updateMenu(token, id, form)
            // console.log(res)
            toast.success(`เพิ่มเมนู ${res.data.title} สำเร็จ`)
            navigate('/admin/menu')
        } catch (err) {
            console.log(err)
        }

    }





    return (
        <div className='container mx-auto p-4 bg-gray-300 '>
            <form onSubmit={hdlSubmit}>
                <h1>เพิ่มรายการอาหาร</h1>
                <input className='w-full bg-white placeholder:text-yellow-400 text-black text-sm border  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-yellow-500 hover:border-red-300 shadow-sm focus:shadow mb-2'
                    value={form.title}
                    onChange={hdlOnChange}
                    placeholder='Title'
                    name='title'
                />
                <input className='w-full bg-white placeholder:text-yellow-400 text-black text-sm border  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-yellow-500 hover:border-red-300 shadow-sm focus:shadow mb-2'
                    value={form.description}
                    onChange={hdlOnChange}
                    placeholder='Description'
                    name='description'
                />
                <input className='w-full bg-white placeholder:text-yellow-400 text-black text-sm border  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-yellow-500 hover:border-red-300 shadow-sm focus:shadow mb-2'
                    type='number'
                    value={form.price}
                    onChange={hdlOnChange}
                    placeholder='Price'
                    name='price'
                />
                <input className="w-full bg-white placeholder:text-yellow-400 text-black text-sm border  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-yellow-500 hover:border-red-300 shadow-sm focus:shadow mb-2"
                    type='number'
                    value={form.quantity}
                    onChange={hdlOnChange}
                    placeholder='Quantity'
                    name='quantity'
                />
                <select
                    className='border mb-2'
                    name='categoryId'
                    onChange={hdlOnChange}
                    required
                    value={form.categoryId}
                >
                    <option value='' disabled>กรุณาเลือกหมวดหมู่อาหาร</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id} >{item.name}</option>

                        )
                    }

                </select>

                <hr />

                <UploadFile form={form} setForm={setForm} />



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
                <Link to={'/admin/menu'}>
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

export default FormEditMenu