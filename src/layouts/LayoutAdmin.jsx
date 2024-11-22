import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarAdmin from '../components/admin/SidebarAdmin'
import HeaderAdmin from '../components/admin/HeaderAdmin'
import MainNav from '../components/MainNav'

const LayoutAdmin = () => {
  return (

    <div>
      <MainNav />
      <div className='flex h-screen'>
        <SidebarAdmin />
        <div className='flex-1 flex flex-col'>
          <HeaderAdmin />

          <main className='flex-1 p-6 bg-slate-600 overflow-y-auto'>
            <Outlet />
          </main>


        </div>
      </div>

    </div>

  )
}

export default LayoutAdmin