import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const URL = import.meta.env.VITE_API_URL

const Register = () => {
  // Javascript
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const hdlOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const hdlSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      return alert('Confirm Password is not match!!!')
    }
    console.log(form)
    // Send to Back
    try {
      const res = await axios.post(`${URL}/api/register`, form)

      console.log(res.data)
      toast.success(res.data)
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }




  return (

    <div className="min-h-screen flex items-center justify-center  relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gray-200 z-[-1]"></div>

      <section className="w-full max-w-2xl p-12 rounded-lg shadow-lg bg-[rgba(15,23,43,0.85)] text-center">
        <div className="mb-8">
          <h2 className="text-5xl text-white mb-4">Register</h2>
          <p className="text-lg text-white">สมัครสมาชิก</p>
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
            <div className="col-span-2">
              <input
                onChange={hdlOnChange}
                name='confirmPassword'
                type="text"
                placeholder="Confirm Password..."
                className="w-full p-4 text-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded"
              />
            </div>
          </div>

          <button className="bg-yellow-500 border border-yellow-500 text-white py-4 px-6 mt-8 w-full text-xl hover:bg-yellow-600 transition-all rounded">
            Register
          </button>
          <a href="/login" className="block mt-4 text-yellow-500 underline hover:text-yellow-600">
            Already have an Account? Login
          </a>
        </form>
      </section>
    </div>
  );
};

export default Register;
