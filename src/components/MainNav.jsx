import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import foodLogo from '../assets/FoodLogo.png';
import useFoodStore from '../store/food-store';
import { ShoppingBasket, Menu } from 'lucide-react';

function MainNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const [activeLink, setActiveLink] = useState('/');

    const user = useFoodStore((s) => s.user); // ดึงข้อมูลผู้ใช้
    const token = useFoodStore((s) => s.token); // ตรวจสอบ token สำหรับเช็คสถานะการล็อกอิน
    const carts = useFoodStore((s) => s.carts);

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    const handleLinkClick = (path) => {
        setActiveLink(path);
        setMenuOpen(false);
    };

    const handleLogout = () => {
        // ฟังก์ชันล็อกเอาท์
        useFoodStore.setState({ token: null, user: null }); // ลบ token และ user ออก
        // อาจเพิ่มการเปลี่ยนเส้นทางไปที่หน้าล็อกอิน หรือหน้าแรก
    };

    // กำหนดสีของผู้ใช้ตาม role
    const roleColor = user?.role === 'admin' ? 'bg-blue-500' : 'bg-green-500';

    return (
        <nav className='bg-yellow-600 sticky top-0 z-50 shadow-md'>
            <div className='mx-auto px-3'>
                <div className='flex justify-between h-16 items-center'>
                    <div className='flex items-center gap-2'>
                        <Link to={'/'} onClick={() => handleLinkClick('/')}>
                            <img src={foodLogo} className='w-12 h-12' alt="Logo" />
                        </Link>
                        <h1 className='text-white font-bold text-2xl'>ไก๊ฟ่าน</h1>
                    </div>

                    {/* Hamburger Menu for Mobile */}
                    <div className='lg:hidden'>
                        <button onClick={() => setMenuOpen(!menuOpen)} className='text-white'>
                            <Menu className='w-8 h-8' />
                        </button>
                    </div>

                    {/* Main Navigation Links */}
                    <div className={`flex-col lg:flex-row lg:flex gap-4 items-center ${menuOpen ? 'flex' : 'hidden'} lg:flex absolute lg:relative top-16 left-0 right-0 bg-gray-200 lg:bg-transparent lg:top-0 transition-all duration-300 ease-in lg:w-auto p-4 lg:p-0`}>
                        <Link
                            to={'/'}
                            className={`${activeLink === '/' ? 'bg-yellow-500 text-white' : 'text-black'} rounded-lg px-3 py-2 shadow hover:shadow-lg transition`}
                            onClick={() => handleLinkClick('/')}
                        >
                            Home
                        </Link>
                        <Link
                            to={'/menu'}
                            className={`${activeLink === '/menu' ? 'bg-yellow-500 text-white' : 'text-black'} rounded-lg px-3 py-2 shadow hover:shadow-lg transition`}
                            onClick={() => handleLinkClick('/menu')}
                        >
                            Menu
                        </Link>
                        <Link
                            to={'/cart'}
                            className={`${activeLink === '/cart' ? 'bg-yellow-500 text-white' : 'text-black'} rounded-lg px-3 py-2 shadow hover:shadow-lg transition relative`}
                            onClick={() => handleLinkClick('/cart')}
                        >
                            <ShoppingBasket />
                            {carts.length > 0 && (
                                <span className='absolute top-0 right-0 bg-red-500 rounded-full px-2'>
                                    {carts.length}
                                </span>
                            )}
                        </Link>

                        {/* แสดงเมนูตามสถานะการล็อกอิน */}
                        {!token ? (
                            <>
                                <Link
                                    to={'/register'}
                                    className={`${activeLink === '/register' ? 'bg-yellow-500 text-white' : 'text-black'} rounded-lg px-3 py-2 shadow hover:shadow-lg transition`}
                                    onClick={() => handleLinkClick('/register')}
                                >
                                    Register
                                </Link>
                                <Link
                                    to={'/login'}
                                    className={`${activeLink === '/login' ? 'bg-yellow-500 text-white' : 'text-black'} rounded-lg px-3 py-2 shadow hover:shadow-lg transition`}
                                    onClick={() => handleLinkClick('/login')}
                                >
                                    Login
                                </Link>
                            </>
                        ) : (
                            <div className='flex items-center gap-4'>
                                <span className={`${roleColor} text-white rounded-lg px-3 py-2 shadow hover:shadow-lg transition`}>
                                    {`ผู้เข้าใช้งาน: ${user.role}`}
                                </span>
                                <Link to={'/'}>
                                    <button
                                        className='bg-red-500 text-white rounded-lg px-3 py-2 shadow hover:shadow-lg transition'
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>

                                </Link>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default MainNav;
