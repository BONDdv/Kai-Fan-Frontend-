import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import useFoodStore from '../../store/food-store'; 

const URL = import.meta.env.VITE_API_URL

const FormQrCode = () => {
    const [tableId, setTableId] = useState('');
    const [qrCodeData, setQrCodeData] = useState('');
    const [baseUrl, setBaseUrl] = useState(`${URL}/api/admin/create-qr`);
    const [qrCodes, setQrCodes] = useState([]);

    const token = useFoodStore((state) => state.token);

    useEffect(() => {
        const savedQrCodes = JSON.parse(localStorage.getItem('qrCodes')) || [];
        setQrCodes(savedQrCodes);
    }, []);

    const handleDeleteQrCode = async (tableId) => {
        try {
            const res = await axios.delete(`${URL}/api/admin/create-qr/${tableId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success) {
                const updatedQrCodes = qrCodes.filter(item => item.id !== tableId);
                setQrCodes(updatedQrCodes);
                localStorage.setItem('qrCodes', JSON.stringify(updatedQrCodes));

                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Error deleting QR Code:', error);
            toast.error('Failed to delete QR Code');
        }
    };

    const hdlGenerateQrCode = async (e) => {
        e.preventDefault();

        if (!tableId || isNaN(tableId)) {
            return toast.warning('Please provide a valid numeric Table ID');
        }

        try {
            const res = await axios.post(
                baseUrl,
                {
                    tableId: tableId.trim(),
                    baseUrl 
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.qrCodeUrl) {
                setQrCodeData(res.data.qrCodeUrl);

                const newQrCode = { id: tableId, code: res.data.qrCodeUrl };
                setQrCodes((prevCodes) => [...prevCodes, newQrCode]);
                localStorage.setItem('qrCodes', JSON.stringify([...qrCodes, newQrCode]));

                setTableId('');
                toast.success(`QR Code generated for Table ${tableId}`);
            } else {
                toast.error('Failed to generate QR Code');
            }
        } catch (err) {
            console.error('Error generating QR Code:', err);
            toast.error(err.response?.data?.message || 'Error generating QR Code');
        }
    };

    return (
        <div className='container mx-auto p-4 bg-gray-300'>
            <h1 className='font-bold mb-2'>Generate QR Code for Table</h1>
            <form className='my-4' onSubmit={hdlGenerateQrCode}>
                <input
                    className='w-full bg-white text-black text-sm border rounded-md px-3 py-2 mb-2 shadow-sm'
                    onChange={(e) => setTableId(e.target.value)}
                    placeholder='Table ID'
                    value={tableId}
                    type="number"
                    min="1"
                />
                <div className='flex py-2'>
                    <button
                        type='submit'
                        className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Generate QR Code
                    </button>
                </div>
            </form>

            <hr className="my-4" />

            <h2 className="font-bold mb-2">All Generated QR Codes</h2>
            <div className="flex flex-col items-center">
                {qrCodes.map((item, index) => (
                    <div key={index} className="flex flex-col items-center mb-4">
                        <h3 className="font-bold">Table {item.id}</h3>
                        <img src={item.code} alt={`QR Code for Table ${item.id}`} width={150} height={150} />
                        <button
                            onClick={() => handleDeleteQrCode(item.id)}
                            className="text-white bg-red-500 hover:bg-red-700 mt-2 rounded px-4 py-2"
                        >
                            Delete QR Code
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormQrCode;
