import React, { useState, useEffect } from 'react';
import { getOrders } from '../../api/user';
import useFoodStore from '../../store/food-store';

const HistoryCard = () => {
    const token = useFoodStore((state) => state.token);
    const [orders, setOrder] = useState([]);

    useEffect(() => {
        hdlGetOrders(token);
    }, [token]);

    const hdlGetOrders = (token) => {
        getOrders(token)
            .then((res) => {
                // กรองข้อมูลการสั่งซื้อและเรียงตามวันที่ล่าสุด (จากใหม่ไปเก่า)
                const sortedOrders = res.data.order.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                setOrder(sortedOrders);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="space-y-4 mt-4">
            <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อ </h1>

            <div className="space-y-4">
                {orders?.map((item, index) => {
                    return (
                        <div key={index} className="bg-gray-200 p-4 rounded-md shadow-md">
                            {/* Header */}
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm">วันที่สั่งอาหาร</p>
                                    <p className="font-bold">
                                        {new Date(item.updatedAt).toLocaleString('th-TH', {
                                            dateStyle: 'short',
                                            timeStyle: 'short',
                                        })}
                                    </p>
                                </div>
                                <div>{item.status}</div>
                            </div>

                            {/* Table */}
                            <div>
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table className="w-full text-sm text-left text-gray-700 bg-white">
                                        <thead className="text-xs text-white uppercase bg-yellow-600">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">เมนู</th>
                                                <th scope="col" className="px-6 py-3">ราคา</th>
                                                <th scope="col" className="px-6 py-3">จำนวน</th>
                                                <th scope="col" className="px-6 py-3">รวม</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.menu?.map((menu, index) => (
                                                <tr key={index} className="bg-white border-b">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        {menu.menu.title}
                                                    </th>
                                                    <td className="px-6 py-4">{menu.menu.price}</td>
                                                    <td className="px-6 py-4">{menu.count}</td>
                                                    <td className="px-6 py-4">
                                                        ฿{menu.menu.price * menu.count}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Total */}
                            <div>
                                <div className="text-right">
                                    <p>ราคาสุทธิ</p>
                                    <p>{item.cartTotal}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HistoryCard;
