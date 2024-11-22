import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // ใช้ toast สำหรับแจ้งเตือน
import 'react-toastify/dist/ReactToastify.css'; // นำเข้าสตายล์ของ toast

import MenuCard from '../components/card/MenuCard';
import useFoodStore from '../store/food-store';
import SearchCard from '../components/card/SearchCard';
import CartCard from '../components/card/CartCard';

const Menu = () => {
  const getMenu = useFoodStore((state) => state.getMenu);
  const menus = useFoodStore((state) => state.menus);
  const carts = useFoodStore((state) => state.carts);
  const user = useFoodStore((state) => state.user)
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = carts.reduce((total, item) => total + item.count, 0);
  const navigate = useNavigate();

  useEffect(() => {
    getMenu();
  }, []);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleHistoryClick = () => {
    if (user) {
      navigate('/user/history');
    } else {
      toast.info('กรุณาล็อกอินก่อนเพื่อดูประวัติการสั่งซื้อ'); 
      navigate('/login'); 
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Search Section */}
      <div className="p-4 bg-slate-300">
        <SearchCard />
      </div>

      {/* Buttons Section */}
      <div className="flex space-x-4 p-4 bg-slate-300 shadow-md rounded-t-lg">
        <button
          onClick={handleHistoryClick}
          className="lex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-200 text-center shadow-sm flex items-center justify-center"
        >
          ประวัติการสั่งซื้อ
        </button>
        <button
          onClick={toggleCart}
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200 text-center shadow-sm flex items-center justify-center"
        >
          เมนูที่เลือก {cartCount > 0 && <span>({cartCount})</span>}
        </button>
      </div>

      {/* Menu Section */}
      <div className="flex flex-1 relative flex-col p-4 bg-slate-300">
        <p className="text-2xl font-bold mb-4">รายการเมนูทั้งหมด</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
          {menus.map((item, index) => (
            <MenuCard key={index} item={item} />
          ))}
        </div>
      </div>

      {/* Cart Popup */}
      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="w-1/2 max-h-3/4 bg-white shadow-lg p-4 rounded-md z-50 overflow-y-auto">
              <button
                onClick={toggleCart}
                className="mb-4 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700 transition"
              >
                ปิด
              </button>
              <div className="max-h-[400px] overflow-y-auto">
                <CartCard />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
