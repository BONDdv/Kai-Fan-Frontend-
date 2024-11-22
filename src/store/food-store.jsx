import axios from "axios";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { listCategory } from "../api/Category";
import { listMenu, searchFillter } from "../api/menu";
import _ from 'lodash';

const foodStore = (set, get) => ({
    user: null,
    token: null,
    categories: [],
    menus: [],
    carts: [],

    // เพิ่มเมนูลงในตะกร้า
    actionAddtoCart: (item) => set((state) => {
        const existingItem = state.carts.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            return {
                carts: state.carts.map(cartItem =>
                    cartItem.id === item.id ? { ...cartItem, count: cartItem.count + 1 } : cartItem
                )
            };
        } else {
            return {
                carts: [...state.carts, { ...item, count: 1 }]  // เพิ่มเมนูใหม่พร้อม count เริ่มต้น
            };
        }
    }),

    // อัปเดตจำนวนของเมนูในตะกร้า
    actionUpdateQuantity: (menuId, newQuantity) => {
        set((state) => ({
            carts: state.carts.map((item) => 
                item.id === menuId ? { ...item, count: Math.max(1, newQuantity) } : item
            )
        }));
    },

    // ลบเมนูออกจากตะกร้า
    actionRemoveMenuCart: (menuId) => {
        set((state) => ({
           carts: state.carts.filter((item) => item.id !== menuId)
        }));
    },

    // ลบเมนูออกหนึ่งหน่วยจากตะกร้า
    actionDecreaseFromCart: (itemId) => set((state) => {
        const updatedCarts = state.carts.map(cartItem => {
            if (cartItem.id === itemId) {
                return { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 };
            }
            return cartItem;
        }).filter(cartItem => cartItem.count > 0);
        return { carts: updatedCarts };
    }),

    // ฟังก์ชันล้างข้อมูลในตะกร้า
    clearCart: () => set(() => ({ carts: [] })),

    // ฟังก์ชันคำนวณราคารวมของสินค้าในตะกร้า
    getTotalPrice: () => {
        return get().carts.reduce((total, item) => total + item.price * item.count, 0);
    },

    // ฟังก์ชันเข้าสู่ระบบ
    actionLogin: async (form) => {
        try {
            const res = await axios.post('http://localhost:9000/api/login', form);
            set({
                user: res.data.payload,
                token: res.data.token
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    },
    
    // ดึงหมวดหมู่สินค้า
    getCategory: async () => {
        try {
            const res = await listCategory();
            set({ categories: res.data });
        } catch (err) {
            console.log(err);
        }
    },
    
    clearCart: () => set(() => ({ carts: [] })), // ฟังก์ชันล้างตะกร้า

    

    // ดึงข้อมูลเมนู
    getMenu: async (count) => {
        try {
            const res = await listMenu(count);
            set({ menus: res.data });
        } catch (err) {
            console.log(err);
        }
    },

    // ฟังก์ชันค้นหาเมนูตามฟิลเตอร์
    actionSearchFillter: async (arg) => {
        try {
            const res = await searchFillter(arg);
            set({ menus: res.data });
        } catch (err) {
            console.log(err);
        }
    },
});

const usePersist = {
    name: 'food-store',
    storage: createJSONStorage(() => localStorage),
};


const useFoodStore = create(persist(foodStore, usePersist));


export default useFoodStore;
