'use client'

import React, { useEffect, useState } from 'react'
import CreditCardPayment from '../payment/CreditCardPayment'
import { Button } from '@/components/ui/button'
import { axiosClient } from '@/libs/axiosClient';
import { env } from '@/libs/env.helper';
import { useAuthStore } from '@/stores/useAuthStore';
import PaypalPayment from '../payment/PaypalPayment';
import CodPayment from '../payment/CodPayment';
import Image from 'next/image';


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

export interface IShippingAddress {
  fullName: string;
  gender: "male" | "female";
  phone: string;
  street: string;
  ward: string;
  district: string;
  city: string;
  country?: string;
}

interface IOrderItem {
  _id: string,
  productVariant: IProductVariant,
  quantity: number,
  currentPrice: number,
  currentSalePrice: number,
  totalAmount: number
}

export interface IOrder {
  orderNumber: string;
  products: IOrderItem[];
  totalAmount: number;
  shippingFee: number;
  tax: number;
  discount: number;
  paymentMethod: string;
  paymentStatus: string;
  shippingAddress: IShippingAddress;
  status: string;
  notes: string;
  user: string;
}

export default function PaymentComponent({ onNext }: { onNext: () => void }) {
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const {user} = useAuthStore();

  //fetch dữ liệu từ orders về
  const fetchOrders = async() => {
    try {
      const response = await axiosClient.get(`${env.API_URL}/orders/user/${user?._id}`);
      if(response.status === 200) {
        //console.log('order===>', response?.data?.data)
        return response?.data?.data;
      };
    } catch (error) {
      console.error('fetching order by id is failed', error)
    }
  };
  
  useEffect(() => {
    if(user?._id) {
      const getOrders = async() => {
        const data = await fetchOrders();
        if(data) setOrders(data);
      };
    
    getOrders();
  }},[user?._id]);
  //console.log('orders===>', orders) 

  return (
    <div className="w-[800px] h-full">
        <div className="bg-white p-2 rounded-sm w-full flex flex-col gap-y-5">
          {orders && orders[0]?.paymentMethod === 'credit_card' && <CreditCardPayment />}
          {orders && orders[0]?.paymentMethod === 'paypal' && <PaypalPayment />}
          {orders && orders[0]?.paymentMethod === 'cod' && <CodPayment />}
          
          {/* Thông tin giỏ hàng hiện tại cần thanh toán */}
          <div className='bg-red-50 p-5 rounded-xl'>
            <h1 className='font-bold'>DANH SÁCH SẢN PHẨM CẦN THANH TOÁN</h1>
            {orders && orders[0]?.products && orders[0].products.length > 0 && orders[0].products.map((p) => (
              <div className='flex justify-between my-3'>
                <div className='flex gap-x-3'>
                  <Image 
                  alt={p.productVariant.variantName}
                  src={p.productVariant.images[0]}
                  width={100}
                  height={100}
                  className="p-2 border border-gray-200"
                  />
                  <div className="flex flex-col gap-y-1 p-1">
                  <p className='w-80'>
                    {p.productVariant.product.product_name}
                  </p>
                  
                  <span className='text-red-500 font-bold'>
                  {p.productVariant.salePrice && p.currentSalePrice.toLocaleString()}₫
                  </span>
                  <span className='line-through text-gray-500 text-[12px]'>
                  {p.productVariant.price && p.currentPrice.toLocaleString()}₫
                  </span>
                  </div>
                  <p className='text-xl text-gray-700 flex items-center'>
                    X
                  </p>
                  <p className='text-2xl flex items-center'>
                    {p.quantity}
                  </p>
                  <p className='text-xl text-gray-700 flex items-center'>
                    =
                  </p>          
                </div>
                <div className="flex flex-col gap-y-1 p-1">
                  <span className='text-red-500 font-bold text-xl flex justify-end'>
                  {p.productVariant.salePrice && (p.currentSalePrice*p.quantity).toLocaleString()}₫
                  </span>
                  <span className='line-through text-gray-500 flex justify-end'>
                  {p.productVariant.price && (p.currentPrice*p.quantity).toLocaleString()}₫
                  </span>
                </div>
              </div>
            ))}
            {/* Tính tổng tiền */}
            <div className="w-full flex justify-between py-6">
              <p className="font-bold text-xl">Tổng tiền</p>
              <p className="text-red-500 font-bold text-2xl flex">{orders && orders[0]?.totalAmount.toLocaleString()}₫</p>
            </div>
          </div>

          {/* Button Đặt hàng ngay */}
          <Button
            type="submit"
            className="w-full py-6 font-bold bg-red-500 rounded-sm hover:bg-red-600 cursor-pointer"
            onClick={onNext}
            >
            THANH TOÁN NGAY
          </Button>
        </div>
    </div>
  )
}
