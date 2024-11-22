import React, { useState } from 'react';
import { BadgePlus, Trash2 } from 'lucide-react';
import useFoodStore from '../../store/food-store';

const MenuCard = ({ item }) => {
    const actionAddtoCart = useFoodStore((state) => state.actionAddtoCart);
    const actionRemoveMenuCart = useFoodStore((state) => state.actionRemoveMenuCart);
    const [isInCart, setIsInCart] = useState(false);

    const handleAddToCart = () => {
        actionAddtoCart(item);
        setIsInCart(true);  // กำหนดสถานะว่ามีเมนูในตะกร้าแล้ว
    };

    const handleCancel = () => {
        actionRemoveMenuCart(item.id);
        setIsInCart(false);  // ยกเลิกสถานะการเพิ่มเมนู
    };

    return (
        <div className="shadow-lg rounded-lg w-full sm:w-56 transition-transform duration-200 transform hover:scale-105">
            <div className="bg-white text-center p-4 flex flex-col justify-between h-full rounded-lg">
                {/* Image Section */}
                <div className="image mb-4 bg-gray-200 rounded-md h-32 flex items-center justify-center">
                    {item.image && item.image.length > 0 ? (
                        <img src={item.image[0].url} alt={item.title} className='w-full h-32 object-cover rounded-md' />
                    ) : (
                        <div className='w-full h-32 bg-gray-300 rounded-md text-center flex items-center justify-center shadow-md'>
                            No Image
                        </div>
                    )}
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold bg-yellow-500 text-white rounded-lg px-3 py-1 mb-2">{item.title}</h2>

                {/* Price */}
                <div className="text-xl font-bold my-1">{item.price}฿</div>

                {/* Description */}
                <p className="text-sm text-gray-700 my-1">{item.description}</p>

                {/* Add to Cart / Cancel Button */}
                <div className="flex items-center justify-center mt-4">
                    {isInCart ? (
                        <button
                            onClick={handleCancel}
                            className="bg-red-500 text-white flex items-center p-2 rounded hover:bg-red-700 transition duration-300 transform hover:scale-110">
                            <Trash2 className='w-4 h-4 mr-1' />
                            <span className="text-lg">ยกเลิก</span>
                        </button>
                    ) : (
                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white flex items-center p-2 rounded hover:bg-yellow-500 transition duration-300 transform hover:scale-110">
                            <BadgePlus className='w-4 h-4 mr-1' />
                            <span className="text-lg">สั่งอาหาร</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
