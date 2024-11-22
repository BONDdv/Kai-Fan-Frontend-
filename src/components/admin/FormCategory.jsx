import React, { useState, useEffect } from 'react'
import { createCategory, listCategory, removeCategory } from '../../api/Category'
import useFoodStore from '../../store/food-store'
import { toast } from 'react-toastify'
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import UploadfileForCategory from './UploadfileForCategory';



const initialState = {
    name: "",
    image: [],
    menu: []
}


const FormCategory = () => {
    const token = useFoodStore((state) => state.token)
    // const [name, setName] = useState('')
    // const [categories, setCategories] = useState([])
    const categories = useFoodStore((state) => state.categories)
    const getCategory = useFoodStore((state) => state.getCategory)
    
    const [form, setForm] = useState({
        name: '',
        image: [],
        menu: []
    })

    const hdlOnChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
    }


    // useEffect(() => {
    //     getCategory()
        
    // }, [])

    useEffect(() => {
        getCategory().then((data) => {
            // console.log("Categories:", data); 
        }).catch((error) => {
            console.error("Error fetching categories:", error);
        });
    }, []);
    


    // const hdlSubmit = async (e) => {
    //     e.preventDefault()
    //     if (!form.name) {
    //         return toast.warning('Please fill data')
    //     }
    //     // console.log(token, form.name)
    //     try {
    //         const res = await createCategory(token, form)
    //         // console.log(res.data.name)
    //         setForm(initialState)
    //         getCategory()
    //         toast.success(`Add Category ${res.data.name} สำเร็จ`)

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const hdlSubmit = async (e) => {
        e.preventDefault();
        if (!form.name) {
            return toast.warning('Please fill data');
        }
        try {
            const res = await createCategory(token, form);
            // console.log("Response:", res.data);
            setForm(initialState);
            getCategory();
            toast.success(`Add Category ${res.data.name} สำเร็จ`);
        } catch (err) {
            console.error("Error submitting form:", err.response?.data || err.message);
            toast.error('Error adding category');
        }
    }
    

    const hdlRemove = async (id) => {
        if(window.confirm('ลบข้อมูลหรือไม่'))
        {try {
            const res = await removeCategory(token, id)
            // console.log(res)
            toast.success(`Deleted ${res.data.name} success`)
            getCategory()
        } catch (err) {
            console.log(err)
        }}
    }

    return (
        <div className='container mx-auto p-4 bg-gray-300 '>
            <h1 className='font-bold mb-2'>หมวดหมู่รายการเมนู</h1>
            <form className='my-4' onSubmit={hdlSubmit}>
                <input className='w-full bg-white  text-black text-sm border  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-yellow-500 hover:border-red-300 shadow-sm focus:shadow mb-2'
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    placeholder='หมวดหมู่รายการเมนู'
                    value={form.name}
                    type="text" />


                <UploadfileForCategory form={form} setForm={setForm}/>
                <div className='flex py-2'>
                    <button

                        className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 "

                    >
                        เพิ่มหมวดหมู่รายการเมนู
                    </button>
                </div>
            </form>


            <hr />




            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">



                    <thead className="text-xs text-white uppercase bg-yellow-600 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                รูปหมวดหมู่เมนู
                            </th>
                            <th scope="col" className="px-6 py-3">
                                ชื่อหมวดหมู่เมนูอาหาร
                            </th>
                            <th scope="col" className="px-6 py-3">
                                จัดการหมวดหมู่เมนูอาหาร
                            </th>
                        </tr>

                    </thead>



                    <tbody>

                        {
                            categories?.map((item, index) => {
                                return (

                                    <tr className="bg-white border-b hover:bg-gray-300 hover:text-white" key={index}>

                                        <th scope="row" className="px-6 py-4 font-medium text-black border-black">
                                            {index + 1}
                                        </th>




                                        <td className="px-0 py-4">
                                            {
                                                item.image.length > 0
                                                    ? <img
                                                        src={item.image[0].url}
                                                        className='w-20 h-20 rounded-lg shadow-md hover:scale-110 '
                                                    />
                                                    : <div className='w-20 h-20 bg-yellow-300 rounded-md flex items-center justify-center ' >ไม่มีรูป</div>
                                            }
                                        </td>





                                        <td className="px-6 py-4">
                                            {item.name}
                                        </td>
                                        <td className="px-6 py-4 flex gap-8 ">
                                            <p className='hover:scale-110'> <Link to={"/admin/category/" + item.id }> <Pencil className='text-blue-400' />แก้ไข </Link>  </p>
                                            <p className='hover:scale-110'> <Link> <Trash2 onClick={() => hdlRemove(item.id)} className='text-red-400' /> ลบ </Link> </p>
                                        </td>

                                    </tr>
                                )
                            })
                        }

                    </tbody>

                </table>
            </div>

        </div>


    )
}

export default FormCategory