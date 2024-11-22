import React, { useEffect, useState } from 'react'
import useFoodStore from '../../store/food-store'
import { createMenu, deleteMenu, readMenu, updateMenu } from '../../api/menu'
import { toast } from 'react-toastify'
import UploadFile from './UploadFile'
import { Pencil } from 'lucide-react';
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react';



const initialState = {
    title: "",
    description: "",
    price: "",
    quantity: "",
    categoryId: '',
    image: []
}



const FormMenu = () => {
    const token = useFoodStore((state) => state.token)
    const getCategory = useFoodStore((state) => state.getCategory)
    const categories = useFoodStore((state) => state.categories)
    const getMenu = useFoodStore((state) => state.getMenu)
    const menus = useFoodStore((state) => state.menus)
    // console.log(menus)
  
    

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        quantity: "",
        categoryId: '',
        image: []
    })

    useEffect(() => {
        getCategory()
        getMenu(100)
    }, [])
    // console.log(categories)

    const hdlOnChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const hdlSubmit = async (e) => {

        e.preventDefault()
        
        try {
            const res = await createMenu(token, form)
            setForm(initialState)
            getMenu()
            toast.success(`เพิ่มเมนู ${res.data.title} สำเร็จ`)
            
        } catch (err) {
            console.log(err)
        }

    }
    // console.log(form)
    const hdlDelete = async(id) => {
        if(window.confirm('ลบข้อมูลหรือไม่')){
            try{
                const res = await deleteMenu(token,id)
                getMenu()
                console.log(res)
                toast.success('ลบรายการอาหาร')
            }catch (err){
                console.log(err)
            }
        }
    }
   
    
   
    

    return (
        <div className='container mx-auto p-4 bg-gray-300 '>
            <form onSubmit={hdlSubmit}>
                <h1 className='font-bold mb-2'>รายการเมนูอาหาร</h1>
                <input className='w-full bg-white  text-black text-sm border  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-yellow-500 hover:border-red-300 shadow-sm focus:shadow mb-2'
                    value={form.title}
                    onChange={hdlOnChange}
                    placeholder='Title'
                    name='title'
                />
                <input className='w-full bg-white  text-black text-sm border  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-yellow-500 hover:border-red-300 shadow-sm focus:shadow mb-2'
                    value={form.description}
                    onChange={hdlOnChange}
                    placeholder='Description'
                    name='description'
                />
                <input className='w-full bg-white text-black text-sm border  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-yellow-500 hover:border-red-300 shadow-sm focus:shadow mb-2'
                    type='number'
                    value={form.price}
                    onChange={hdlOnChange}
                    placeholder='Price'
                    name='price'
                />
                <input className="w-full bg-white  text-black text-sm border  rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-yellow-500 hover:border-red-300 shadow-sm focus:shadow mb-2"
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
                    <option value='' disabled>กรุณาเลือกหมวดหมู่เมนูอาหาร</option>
                    {
                        categories.map((item, index) =>
                            <option key={index} value={item.id} >{item.name}</option>

                    )
                    
                    }

                </select>

                <hr />
                
                <UploadFile  form={form} setForm={setForm}/>
                
                

                <div className='flex py-2'>
                    <button

                        className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 "

                    >
                        เพิ่มรายการอาหาร
                    </button>
                </div>



                <hr />

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-white uppercase bg-yellow-600 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    รูปเมนู
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ชื่อเมนูอาหาร
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    วัตถุดิบ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ราคา
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    จำนวนที่มีอยู่
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    จำนวนที่ขาย
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    วันที่อัปเดทข้อมูล
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    จัดการเมนู
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                
                                menus.map((item, index) => {
                                    
                                   
                                    return (
                                        <tr className="bg-white border-b hover:bg-gray-300 hover:text-white" key={index}>
                                            <th scope="row" className="px-6 py-4 font-medium text-black border-black">
                                                {index+1}
                                            </th>

                                            {/* IMG */}
                                            <td className="px-0 py-4">
                                                {
                                                    item.image.length > 0
                                                    ? <img 
                                                    src={item.image[0].url}
                                                    className='w-20 h-20 rounded-lg shadow-md hover:scale-110 ' 
                                                    />
                                                    :  <div className='w-20 h-20 bg-yellow-300 rounded-md flex items-center justify-center ' >ไม่มีรูป</div>
                                                }
                                            </td>
                                                
                                            {/* IMG */}

                                            <td className="px-6 py-4">
                                                {item.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.description}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.price}฿
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.quantity}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.sold}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.updatedAt}
                                            </td>
                                            <td className="px-6 py-4 flex gap-8 ">
                                                <p className='hover:scale-110'> <Link to={'/admin/menu/'+ item.id}> <Pencil  className='text-blue-400'/>แก้ไขเมนู </Link>  </p>
                                                <p className='hover:scale-110'> <Link> <Trash2 onClick={()=>hdlDelete(item.id)} className='text-red-400'/> ลบเมนู </Link> </p>
                                            </td>
                                            
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>




            </form>
        </div>
    )
}

export default FormMenu