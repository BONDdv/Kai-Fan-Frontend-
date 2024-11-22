import React from 'react'
import AppRoutes from './routes/AppRoutes'
import './index.css';
import './output.css'; // เพิ่มบรรทัดนี้ในไฟล์ที่เหมาะสม
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // นำเข้าสไตล์



const App = () => {

  return (
    <div>
      <ToastContainer />
      <AppRoutes />
    </div>
  )
}

export default App
