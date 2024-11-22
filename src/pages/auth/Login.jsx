import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useFoodStore from '../../store/food-store';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
  // Javascript
  const navigate = useNavigate()
  const actionLogin = useFoodStore((state) => state.actionLogin)
  const user = useFoodStore((state) => state.user)
  // console.log('user form zuster', user)
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const hdlSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await actionLogin(form)
      const role = res.data.payload.role
      // console.log("role",role)
      
      roleRedirect(role)
      // toast.success('Login success')
      setTimeout(() => {
        toast.success('Login success');
      }, 100); // ดีเลย์ 100 มิลลิวินาที
      
      
    } catch (err) {
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }

  }

  const roleRedirect = (role) => {
    if (role === 'admin') {
      navigate('/admin/category')
      return true
    } else {
      navigate(-1)
      return true
    }
  }




  return (

    <div className="min-h-screen flex items-center justify-center bg-[url('/image/aboutImg1_3.jpg')] bg-cover bg-center relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-200 z-[-1]"></div>

      <section className="w-full max-w-2xl p-12 rounded-lg shadow-lg bg-[rgba(15,23,43,0.85)] text-center">
        <div className="mb-8">
          <h2 className="text-5xl text-white mb-4">Login</h2>
          <p className="text-lg text-white">เข้าสู่ระบบ</p>
        </div>

        <form onSubmit={hdlSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="col-span-2">
              <input
                onChange={hdlOnChange}
                name='email'
                type="email"
                placeholder="Email..."
                className="w-full p-4 text-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
              />
            </div>
            <div className="col-span-2">
              <input
                onChange={hdlOnChange}
                name='password'
                type="text"
                placeholder="Password..."
                className="w-full p-4 text-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
              />
            </div>

          </div>

          <button className="bg-yellow-500 border border-yellow-500 text-white py-4 px-6 mt-8 w-full text-xl hover:bg-yellow-600 transition-all rounded">
            Login
          </button>
          <Link to={'/register'}>
            <p className="block mt-4 text-yellow-500 underline hover:text-yellow-600">
              Don't have an Account? Register
            </p>
          </Link>

        </form>
      </section>
    </div>
  );
};

export default Login;
