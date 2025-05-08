"use client"

import { useState } from "react"
import ClickBuyDialog from "@/app/ui/cart/ClickBuyDialog"
import { useAuthStore } from "@/stores/useAuthStore"
import { axiosClient } from "@/libs/axiosClient"
import { env } from "@/libs/env.helper"

interface BuyButtonProps {
  productId: string
  price: number
  salePrice: number
}

export default function BuyButton({ productId, price, salePrice }: BuyButtonProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const { user } = useAuthStore()

  const handleAddToCart = async () => {
    if (!user) {
      // Open dialog if not logged in
      setOpenDialog(true)
    } else {
      // Call API to add product to cart
      try {
        const response = await axiosClient.post(`${env.API_URL}/carts/user/${user._id}`, {
          product: productId,
          quantity: 1,
          currentPrice: price,
          currentSalePrice: salePrice,
          totalAmount: salePrice,
        })

        if (response.status === 201) {
          alert("Bạn đã thêm vào giỏ hàng thành công")
        }
      } catch (error) {
        console.error("Error adding to cart:", error)
      }
    }
  }

  return (
    <div className="mt-8">
      <button className="w-[300px] py-2 bg-red-600 text-white font-semibold rounded-[3px]" onClick={handleAddToCart}>
        <h1 className="text-[15px]">MUA NGAY</h1>
        <h2 className="text-[10px]">Giao tận nơi hoặc nhận tại cửa hàng</h2>
      </button>

      <ClickBuyDialog open={openDialog} setOpen={setOpenDialog} onAddToCart={handleAddToCart} />
    </div>
  )
}