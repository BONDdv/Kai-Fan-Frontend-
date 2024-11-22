import { Navigate } from 'react-router-dom';

const checkQrScan = (Component) => {
    const qrScanned = sessionStorage.getItem('qrScanned'); // ดึงค่าจาก sessionStorage หรือใช้ context
    const tableId = sessionStorage.getItem('tableId');

    if (!qrScanned) {
        // ถ้ายังไม่ได้สแกน QR Code ให้ redirect ไปที่หน้า home หรือหน้าอื่น
        return <Navigate to="/" />;
    }

    // ถ้าสแกนแล้วให้ render หน้า component
    return <Component tableId={tableId} />;
};

export default checkQrScan;
