import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './output.css'; // เพิ่มบรรทัดนี้ในไฟล์ที่เหมาะสม

createRoot(document.getElementById('root')).render(
  <>
  
    <App />

  
  </>,
)
