import React, { useState, useEffect } from 'react';
import { listUserCart } from '../../api/user';
import useFoodStore from '../../store/food-store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SumCheckout = () => {
    const token = useFoodStore((state) => state.token);
    const [menus, setMenus] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        hdlGetUserCart(token);
    }, []);

    const hdlGetUserCart = (token) => {
        listUserCart(token)
            .then((res) => {
                setMenus(res.data.menu);
                setCartTotal(res.data.cartTotal);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handlePayment = () => {
        // Logic สำหรับการชำระเงิน
        toast.info('กำลังดำเนินการชำระเงิน'); // แจ้งเตือนเมื่อเริ่มชำระเงิน
        navigate('/user/payment');
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='container mx-auto p-4'>
                <div className='w-full'>
                    <div className='bg-white p-6 border border-gray-300 rounded-lg shadow-md space-y-6'>
                        <h1 className='font-semibold text-xl text-gray-800 text-center'>ยอดรวมรายการอาหาร</h1>

                        {/* Item List */}
                        {menus?.map((item, index) => (
                            <div key={index} className='border-b pb-4'>
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <p className='text-gray-700'>{item.menu.title}</p>
                                        <p className='text-sm text-gray-500'>จำนวน : {item.count} x {item.menu.price} </p>
                                    </div>
                                    <div>
                                        <p className='text-red-500 font-bold'> {item.count * item.menu.price} ฿</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Discount */}
                        <div className='border-b pb-4'>
                            <div className='flex justify-between'>
                                <p className='text-gray-700'>ส่วนลด</p>
                                <p className='text-gray-500'>0.00 ฿</p>
                            </div>
                        </div>

                        {/* Total */}
                        <div className='pt-4'>
                            <div className='flex justify-between'>
                                <p className='font-bold text-lg'>ยอดรวมสุทธิ :</p>
                                <p className='text-red-500 font-bold text-lg'> {cartTotal} ฿</p>
                            </div>
                        </div>

                        {/* Payment Button */}
                        <button
                            onClick={handlePayment} // เมื่อกดชำระเงินจะเรียก handlePayment
                            className='w-full text-white bg-red-500 hover:bg-red-600 rounded-md px-4 py-3 transition-transform transform hover:-translate-y-1 duration-200'>
                            ชำระเงิน
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SumCheckout;
