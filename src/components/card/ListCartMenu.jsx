import React from 'react'
import useFoodStore from '../../store/food-store'
import { Trash2 } from 'lucide-react';
import { Link , useNavigate} from 'react-router-dom';
import { createUserCart } from '../../api/user';
import { toast } from 'react-toastify';


const ListCartMenu = () => {

    const cart = useFoodStore((state) => state.carts)
    const actionUpdateQuantity = useFoodStore((state) => state.actionUpdateQuantity)
    const actionRemoveMenuCart = useFoodStore((state) => state.actionRemoveMenuCart)
    const getTotalPrice = useFoodStore((state) => state.getTotalPrice)
    const token = useFoodStore((s)=>s.token)
    const user = useFoodStore((s) => s.user)
    const navigate = useNavigate()

    const hdlSaveCart = async () => {
        await createUserCart(token, {cart})
        .then((res)=> {
            console.log(res)
            toast.success('ยืนยันรายการอาหาร')
            navigate('/checkout')
        })
        .catch((err)=>{
            console.log(err)
            toast.warning(err.response.data.message)
        })
    }

    // console.log("user", user)

    return (
        <div>
            <div className="bg-gray-100 h-screen py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-2xl font-semibold mb-4">รายการอาหาร</h1>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-3/4">

                            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-semibold">เมนูอาหาร</th>
                                            <th className="text-left font-semibold">ราคา</th>
                                            <th className="text-left font-semibold">จำนวน</th>
                                            <th className="text-left font-semibold">ราคารวม</th>
                                            <th className="text-left font-semibold">ลบ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        {item.image && item.image.length > 0 ? (
                                                            <img
                                                                className="h-16 w-16 mr-4 rounded-md"
                                                                src={item.image[0].url}
                                                                alt={item.title}
                                                            />
                                                        ) : (
                                                            <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                                                                ไม่มีรูป
                                                            </div>
                                                        )}
                                                        <span className="font-semibold">{item.title}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">{item.price} ฿</td>
                                                <td className="py-4">
                                                    <div className="flex items-center">
                                                        <button
                                                            onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                                            className="border rounded-md py-2 px-4 mr-2 hover:bg-red-500"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-center w-8">{item.count}</span>
                                                        <button
                                                            onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                                            className="border rounded-md py-2 px-4 ml-2 hover:bg-blue-500"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="py-4">{(item.price * item.count).toFixed(2)} ฿</td>
                                                <td className="py-4">
                                                    <Trash2
                                                        onClick={() => actionRemoveMenuCart(item.id)}
                                                        className='text-red-500  hover:scale-110'
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div className="md:w-1/4">

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold mb-4">ยอดรวม</h2>
                                <div className="flex justify-between mb-2">
                                    <span>ยอดรวมสุทธิ</span>
                                    <span className='font-bold'>{getTotalPrice().toFixed(2)} ฿</span>
                                </div>


                                {
                                    user
                                        ? <Link> <button 
                                        onClick={hdlSaveCart}
                                        className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 w-full">ดำเนินการชำระเงิน</button> </Link>
                                        : <Link to={'/login'}> <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Login</button> </Link>
                                }



                                <Link to={'/menu'}>

                                    <button className="bg-gray-500 text-white py-2 px-4 rounded-lg mt-4 w-full">แก้ไข</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListCartMenu
