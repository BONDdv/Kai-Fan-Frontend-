import React from "react";
import { Trash2, Minus, Plus } from "lucide-react";
import useFoodStore from "../../store/food-store";
import { Link } from "react-router-dom";

const CartCard = () => {
  // State และ Action ต่างๆ จาก Store
  const carts = useFoodStore((state) => state.carts);
  const actionUpdateQuantity = useFoodStore(
    (state) => state.actionUpdateQuantity
  );
  const actionRemoveMenuCart = useFoodStore(
    (state) => state.actionRemoveMenuCart
  );
  const getTotalPrice = useFoodStore((state) => state.getTotalPrice);

  return (
    <div>
      <h1 className="text-2xl font-bold">รายการเมนูที่สั่ง</h1>
      
      {/* Border */}
      <div className="border p-2">
        {/* Card */}
        {carts.length > 0 ? (
          carts.map((item, index) => (
            <div key={index} className="bg-white p-2 rounded-md shadow-md mb-2">
              {/* Row 1 */}
              <div className="flex justify-between mb-2">
                {/* Left */}
                <div className="flex gap-2 items-center">
                  {item.image && item.image.length > 0 ? (
                    <img className="w-16 h-16 rounded-md" src={item.image[0].url} alt={item.title} />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
                      No Image
                    </div>
                  )}
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
                {/* Right */}
                <div
                  onClick={() => actionRemoveMenuCart(item.id)}
                  className="text-red-600 p-2 cursor-pointer hover:text-red-800 transition"
                >
                  <Trash2 />
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex justify-between items-center">
                {/* Left */}
                <div className="border rounded-sm px-2 py-1 flex items-center">
                  <button
                    onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                    className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-300 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4">{item.count}</span>
                  <button
                    onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                    className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-300 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {/* Right */}
                <div className="font-bold text-blue-500">{item.price * item.count} ฿</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">ไม่มีรายการอาหาร</div>
        )}

        {/* Total */}
        {carts.length > 0 && (
          <>
            <div className="flex justify-between px-2">
              <span>รวม</span>
              <span>{getTotalPrice()} ฿</span>
            </div>
            {/* Button */}
            <Link to="/cart">
              <button
                className="mt-4 bg-green-500 hover:bg-green-700 text-white w-full py-2 rounded-md shadow-md"
              >
                ยืนยันออร์เดอร์
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CartCard;
