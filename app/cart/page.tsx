"use client";

import { useEffect, useRef } from "react";

export default function CartPage() {
  const orderBoxRef = useRef<HTMLDivElement>(null);

  const scrollToOrderBox = () => {
    orderBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center text-blue-600">Giỏ hàng</h1>

      {/* Nội dung giả lập */}
      <div className="space-y-4">
        <p>Sản phẩm 1 - MacBook Pro 14"</p>
        <p>Sản phẩm 2 - iPhone 15 Pro Max</p>
        <p>Sản phẩm 3 - AirPods Pro 2</p>
      </div>

      {/* Nút cuộn tới box */}
      <div className="text-center">
        <button
          onClick={scrollToOrderBox}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          Đi tới phần thanh toán
        </button>
      </div>

      {/* Phần thanh toán */}
      <div
        ref={orderBoxRef}
        id="cart-buy-order-box"
        className="mt-20 border rounded-xl p-6 shadow-lg bg-gray-50"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Thanh toán đơn hàng</h2>
        <p>Nhập thông tin giao hàng và chọn phương thức thanh toán.</p>
      </div>
    </div>
  );
}
