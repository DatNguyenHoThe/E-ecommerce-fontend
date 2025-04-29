"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CreditCard, IdCard, ShieldCheck, ShoppingCart, Trash2 } from "lucide-react";
import { axiosClient } from "@/libs/axiosClient";
import { env } from "@/libs/env.helper";
import { useAuthStore } from "@/stores/useAuthStore";
import CartComponent from "../ui/cart/CartComponent";
import InfoComponent from "../ui/cart/InfoComponent";
import PaymentComponent from "../ui/cart/PaymentComponent";
import DoneComponent from "../ui/cart/DoneComponent";


interface IProduct {
  _id: string;
  product_name: string;
}

interface IProductVariant {
  _id: string;
  variantName: string;
  price: number;
  salePrice: number;
  images: string[];
  product: IProduct;
}

interface ICartItem {
  _id: string;
  productVariant: IProductVariant;
  quantity: number;
  currentPrice: number;
  currentSalePrice: number;
  totalAmount: number;
}

interface ICart {
  _id: string;
  items: ICartItem[];
  totalAmount: number;
  user: string
}

export default function CartPage() {
  const [step, setStep] = useState<"cart" | "info" | "payment" | "done">("cart");
  const {user} = useAuthStore();
  const [carts, setCarts] = useState<ICart | null>(null);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  console.log('cartItems===>', cartItems);


  //----------------------BEGIN GET ALL CART-------------------------//
  const fetchCarts = async(userId: string) => {
    try {
      const response = await axiosClient.get(`${env.API_URL}/carts/user/${userId}`);
      if(response.status === 200) {
        return response?.data?.data;
      }
    } catch (error) {
      console.error('fetching carts is failed', error);
    }
  }
  useEffect(() => {
    if(user?._id === undefined) return;
    const getCarts = async(userId: string) => {
      const data = await fetchCarts(userId);
      console.log('carts===>', JSON.stringify(data, null, 2));
      if(data) {
        console.log('carts items:', data.items); // Kiểm tra items
        setCarts(data);
      } 
      
    }
    getCarts(user?._id);
  },[user?._id]);

  //----------------------BEGIN CLICK ADD TO CART-------------------------//
  const createAddToCart = async(values: ICart): Promise<ICart | undefined> => {
    const response = await axiosClient.post(`${env.API_URL}/carts`, values)
    if(response.status === 201) {
      alert('Thêm vào giỏ hàng thành công');
      return response.data;
    } else {
      alert('Thêm vào giỏ hàng thất bại');
    }
  }
  //Handle thêm vào giỏ hàng
  const handleAddToCart = async(values: ICart) => {
    const response = await createAddToCart(values);
    //làm mới giỏ hàng
    if(response && user?._id) {
      const data = await fetchCarts(user?._id);
      if(data) setCarts(data);
    }
  }

  //lấy dữ liệu để truyền vào values

  //----------------------END CLICK ADD TO CART-------------------------//

  //----------------------BEGIN CART ITEMS-----------------------------//
  useEffect(() => {
    if (carts?.items) {
      setCartItems(carts.items);
      setTotalAmount(carts.totalAmount);
    }
  }, [carts]);
  //Hàm tăng sản phẩm
  const handleIncreaseQty = (itemId: string) => {
    const updateCartItems = cartItems?.map((item) => {
      if(item._id === itemId) {
        const newQuantity = item.quantity + 1;
        const newTotalAmount = item.productVariant.salePrice * newQuantity;
        console.log('newQuantity, newTotalAmount===>', newQuantity, newTotalAmount);
        setTotalAmount(totalAmount + item.productVariant.salePrice);
        return {...item, quantity: newQuantity, totalAmount: newTotalAmount}
      }
      return item;
  });
  setCartItems(updateCartItems);
  }
  //Hàm giảm sản phẩm
  const handleDecreaseQty = (itemId: string) => {
    const updateCartItems = cartItems?.map((item) => {
      if(item._id === itemId) {
        const newQuantity = item.quantity > 1 ? item.quantity -1 : 1;
        const newTotalAmount = item.productVariant.salePrice * newQuantity;
        console.log('newQuantity, newTotalAmount===>', newQuantity, newTotalAmount);
        setTotalAmount(totalAmount - item.productVariant.salePrice);
        return {...item, quantity: newQuantity, totalAmount: newTotalAmount}
      }
      return item;
  });
  setCartItems(updateCartItems);
  }
  //Xóa sản phẩm
  //Gọi API delete item
  const deleteItem = async(itemId: string) => {
    try {
      const response = await axiosClient.delete(`${env.API_URL}/carts/user/${user?._id}/item/${itemId}`);
      if(response.status === 200) {
        alert('Xóa sản phẩm thành công');
        return response.data;
      } else {
        alert('Xóa sản phẩm thất bại')
      }
    } catch (error) {
      console.error('delete cartitem is failed');
    }
  }
  //gọi hàm xóa sản phẩm
  const handleDelete = async(itemId: string) => {
    const response = await deleteItem(itemId);
    if(response && user?._id) {
      const updated = await fetchCarts(user?._id);
      if(updated) setCartItems(updated)
    }
  }
  //----------------------END CART ITEMS-----------------------------//
  
  return (
    <>
    <div className="flex justify-center bg-gray-100">
      {/* Mua thêm sản phẩm khác */}
      <div className="w-[800px] h-full">
        <div className="text-blue-500 pr-2 py-4 px-4">
          <Link href={'/products'}>{`< Mua thêm sản phẩm khác`}</Link>
        </div>
        {/* Navigation cart */}
        
        <div className="bg-white p-2 rounded-sm">
          <div className="flex w-full h-22 bg-red-50 justify-center items-center gap-x-18">
            <div 
            onClick={() => setStep("cart")}
            className="flex flex-col gap-y-1 justify-center items-center cursor-pointer">
              <span className="text-gray-600"><ShoppingCart /></span>
              <span className="text-gray-600">Giỏ hàng</span>
            </div>
            <div 
            onClick={() => setStep("info")}
            className="flex flex-col gap-y-1 justify-center items-center cursor-pointer">
              <span className="text-gray-600"><IdCard /></span>
              <span className="text-gray-600">Thông tin đặt hàng</span>
            </div>
            <div 
            onClick={() => setStep("payment")}
            className="flex flex-col gap-y-1 justify-center items-center cursor-pointer">
              <span className="text-gray-600"><CreditCard /></span>
              <span className="text-gray-600">Thanh toán</span>
            </div>
            <div 
            onClick={() => setStep("done")}
            className="flex flex-col gap-y-1 justify-center items-center cursor-pointer">
              <span className="text-gray-600"><ShieldCheck /></span>
              <span className="text-gray-600">Hoàn tất</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-center bg-gray-100 pb-6">
      {/* Cart content */}
      <AnimatePresence mode="wait">
      {step === "cart" && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <CartComponent onNext={() => setStep("info")} />
            </motion.div>
          )}

          {step === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <InfoComponent onNext={() => setStep("payment")} />
            </motion.div>
          )}

          {step === "payment" && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <PaymentComponent onNext={() => setStep("info")} />
            </motion.div>
          )}
          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <DoneComponent onBack={() => setStep("done")} />
            </motion.div>
          )}
      </AnimatePresence>
    </div>      
    </>
  );
}

