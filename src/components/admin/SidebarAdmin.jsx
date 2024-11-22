import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UtensilsCrossed, Utensils, Soup, Rows4, LogOut, QrCode } from 'lucide-react';
import useFoodStore from '../../store/food-store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // นำเข้า CSS ของ toast

const SidebarAdmin = () => {
  const user = useFoodStore((s) => s.user);
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อเปลี่ยนเส้นทาง

  const handleLogout = () => {
    console.log("Logout button clicked"); // ตรวจสอบว่าฟังก์ชันถูกเรียก
    useFoodStore.setState({ token: null, user: null }); // ลบ token และ user ออก
    toast.success('Logout success!'); // แสดง toast notification
    navigate('/login'); // เปลี่ยนเส้นทางไปที่หน้าล็อกอิน
  };

  return (
    <div className='bg-slate-600 w-64 text-white flex flex-col h-screen border-r-4 border-solid border-white'>
      <div className='h-16 bg-slate-600 border-b-4 border-solid border-white flex items-center justify-center text-2xl font-bold'>
        Admin panel
      </div>

      <nav className='flex-1 px-4 py-4 space-y-2 '>
        {/* <NavLink 
          to={'/admin'}
          end
          className={({ isActive }) =>
            isActive
              ? 'bg-yellow-600 text-white flex items-center p-4'
              : 'bg-white text-black hover:bg-gray-400 hover:text-white flex items-center p-4'
          }
        >
          <Utensils className='mr-2' />
          Dashboard
        </NavLink> */}
        {/* <NavLink 
          to={'manage'}
          className={({ isActive }) =>
            isActive
              ? 'bg-yellow-600 text-white flex items-center p-4'
              : 'bg-white text-black hover:bg-gray-400 hover:text-white flex items-center p-4'
          }
        >
          <UtensilsCrossed className='mr-2' />
          Manage
        </NavLink> */}
        <NavLink 
          to={'category'}
          className={({ isActive }) =>
            isActive
              ? 'bg-yellow-600 text-white flex items-center p-4'
              : 'bg-white text-black hover:bg-gray-400 hover:text-white flex items-center p-4'
          }
        >
          <Rows4 className='mr-2' />
          Category
        </NavLink>
        <NavLink 
          to={'menu'}
          className={({ isActive }) =>
            isActive
              ? 'bg-yellow-600 text-white flex items-center p-4'
              : 'bg-white text-black hover:bg-gray-400 hover:text-white flex items-center p-4'
          }
        >
          <Soup className='mr-2' />
          Menu
        </NavLink>
        {/* <NavLink 
          to={'create-qr'}
          className={({ isActive }) =>
            isActive
              ? 'bg-yellow-600 text-white flex items-center p-4'
              : 'bg-white text-black hover:bg-gray-400 hover:text-white flex items-center p-4'
          }
        >
          <QrCode className='mr-2' />
          Qr Code
        </NavLink> */}
      </nav>    

      <div>
        <button 
          onClick={handleLogout} // เรียกใช้ฟังก์ชัน logout
          className='bg-white text-black hover:bg-gray-400 flex items-center p-4 w-full'
        >
          <LogOut className='mr-2' />
          Logout
        </button>
      </div>

      <ToastContainer /> {/* เพิ่ม ToastContainer ที่นี่ */}
    </div>
  );
}

export default SidebarAdmin;
