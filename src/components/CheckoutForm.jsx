import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../stripe.css";
import useFoodStore from "../store/food-store"; 
import { saveOrder } from "../api/user";  // API สำหรับบันทึกคำสั่งซื้อ
import { Link, useNavigate } from "react-router-dom";  // ใช้ useNavigate เพื่อไปยังหน้าต่างๆ หลังจากชำระเงินสำเร็จ
import { toast } from 'react-toastify';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate(); // ใช้ useNavigate แทน Link เพื่อนำผู้ใช้ไปหน้าต่างๆ หลังจากชำระเงินสำเร็จ
    
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);  // ตัวแปรเพื่อจัดการสถานะการชำระเงิน

    const token = useFoodStore((state) => state.token);
    const carts = useFoodStore((state) => state.carts);  // ตะกร้าสินค้า
    const cartTotal = carts.reduce((total, item) => total + item.count * item.price, 0);  // ยอดรวมของตะกร้า

    // ฟังก์ชันเมื่อกดปุ่มชำระเงิน
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const payload = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (payload.error) {
            setMessage(payload.error.message);  // แสดงข้อความผิดพลาดจาก Stripe
        } else {
            // ทำการบันทึกคำสั่งซื้อในฐานข้อมูล
            const orderPayload = {
                paymentIntent: payload.paymentIntent,  // ข้อมูลการชำระเงินจาก Stripe
                cartTotal: cartTotal,  // ยอดรวมจากตะกร้า
            };

            saveOrder(token, orderPayload)
                .then((res) => {
                    // เมื่อบันทึกคำสั่งซื้อสำเร็จ
                    console.log(res);
                    
                    
                    // เคลียร์ข้อมูลใน localStorage และ store หลังการชำระเงิน
                    localStorage.removeItem('cart');  // เคลียร์ข้อมูลตะกร้าจาก localStorage
                    useFoodStore.getState().clearCart();  // เคลียร์ข้อมูลใน store (ถ้ามีการจัดการ state ด้วย store)

                    // ตั้งค่า paymentSuccess เป็น true เพื่อให้ปุ่มไปหน้าเมนูทำงานได้
                    setPaymentSuccess(true);
                    toast.success('การชำระเงินของคุณสำเร็จ!');
                })
                .catch((err) => {
                    console.log(err);
                    toast.error('เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ');
                });
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs",
    };

    return (
        <>
            <form className="space-y-6" id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                
                {/* ถ้าชำระเงินสำเร็จแล้ว จะแสดงปุ่มที่นำผู้ใช้ไปหน้าเมนู */}
                {paymentSuccess ? (
                    <button
                        className="stripe-button bg-green-500"
                        onClick={() => navigate('/user/history')}  // ใช้ navigate เพื่อนำไปหน้าเมนู
                    >
                        ไปที่ประวัติการสั่งซื้อ
                    </button>
                ) : (
                    <button
                        className="stripe-button"
                        disabled={isLoading || !stripe || !elements}
                        id="submit"
                    >
                        <span id="button-text">
                            {isLoading ? (
                                <div className="spinner" id="spinner"></div>
                            ) : (
                                "ยืนยันรายการชำระเงิน"
                            )}
                        </span>
                        
                    </button>
                )}
                
                {/* แสดงข้อความผิดพลาดหรือข้อความสำเร็จ */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </>
    );
}
