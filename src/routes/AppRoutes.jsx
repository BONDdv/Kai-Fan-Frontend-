import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Menu from '../pages/Menu';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import History from '../pages/user/History';
import CheckOut from '../pages/Checkout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Layout from '../layouts/Layout';
import LayoutAdmin from '../layouts/LayoutAdmin';
import Dashboard from '../pages/admin/Dashboard';
import Category from '../pages/admin/Category';
import MenuAdmin from '../pages/admin/MenuAdmin';
import Manage from '../pages/admin/Manage';
import LayoutUser from '../layouts/LayoutUser';
import HomeUser from '../pages/user/HomeUser';
import ProtectRouteUser from './ProtectRouteUser';
import ProtectRouteAdmin from './ProtectRouteAdmin';
import EditMenu from '../pages/admin/EditMenu';
import EditCategory from '../pages/admin/EditCategory';
import QrCode from '../pages/admin/QrCode';
import Payment from '../pages/user/Payment';
// import checkQrScan from '../middlewares/checkQrScan';

const AppRoutes = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: `menu`, element: <Menu /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <CheckOut /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ]
  },
  {
    path: '/admin',
    element: <ProtectRouteAdmin element={<LayoutAdmin />}/>,
    children: [
      // {index: true, element: <Dashboard />},
      // {index: true, element: ''},
      { path: 'category', element: <Category />},
      // { path: 'create-qr', element: <QrCode />},
      { path: 'category/:id', element: <EditCategory />},
      { path: 'menu', element: <MenuAdmin />},
      { path: 'menu/:id', element: <EditMenu />},
      { path: 'manage', element: <Manage />},
    ]
  },
  {
    path: '/user',
    // element: <LayoutUser />,
    element: <ProtectRouteUser element = {<LayoutUser />}/>,
    children: [
      {index: true, element: <HomeUser />},
      {path: 'payment', element: <Payment />},
      { path: 'history', element: <History /> },
     
    ]
  },

]);




export default AppRoutes
