"use client";

import { useEffect, useState } from "react";
import ClickBuyDialog from "@/app/ui/cart/ClickBuyDialog";
import { useAuthStore } from "@/stores/useAuthStore";
import { axiosClient } from "@/libs/axiosClient";
import { env } from "@/libs/env.helper";
import { ICart } from "@/app/types/types";

interface BuyButtonProps {
  productId: string;
  price: number;
  salePrice: number;
}

export default function BuyButton({
  productId,
  price,
  salePrice,
}: BuyButtonProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useAuthStore();
  const [carts, setCarts] = useState<ICart | null>(null);


  //----------------------BEGIN GET ALL CART-------------------------//
  const fetchCarts = async (userId: string) => {
    try {
      const response = await axiosClient.get(
        `${env.API_URL}/carts/user/${userId}`
      );
      if (response.status === 200) {
        return response?.data?.data;
      }
    } catch (error) {
      console.error("fetching carts is failed", error);
    }
  };
  useEffect(() => {
    if (user?._id === undefined) return;
    const getCarts = async (userId: string) => {
      const data = await fetchCarts(userId);
      if (data) {
        setCarts(data);
      }
    };
    getCarts(user?._id);
  }, [user?._id]);
  //----------------------END GET ALL CART-------------------------//

  //REFRESH CART
  const refreshCarts = async () => {
    if (!user?._id) return;
    const data = await fetchCarts(user._id);
    if (data) setCarts(data);
  };
  //AddToCart
  const addToCart = async () => {
    try {
      const response = await axiosClient.post(
        `${env.API_URL}/carts/user/${user?._id}`,
        {
          product: productId,
          quantity: 1,
          currentPrice: price,
          currentSalePrice: salePrice,
          totalAmount: salePrice,
        }
      );
      if (response.status === 201) {
        alert("Bạn đã thêm vào giỏ hàng thành công");
        await refreshCarts();
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      // Open dialog if not logged in
      setOpenDialog(true);
    } else {
      //kiểm tra xem đã có sản phẩm đó trong giỏ hàng hay chưa
      if (carts && carts.items.some((item: any) => productId === item.product._id)) {
        alert(
          "Sản phẩm này đã có trong giỏ hàng, bạn có thể kiểm tra giỏ hàng để biết thêm chi tiết"
        );
      } else {
        //Không thì sẽ thêm productId vào mảng và thêm sản phẩm vào giỏ hàng
        addToCart();
      }
    }
  };

  return (
    <div className="mt-8">
      <button
        className="w-[300px] py-2 bg-red-600 text-white font-semibold rounded-[3px]  cursor-pointer"
        onClick={handleAddToCart}
      >
        <h1 className="text-[15px]">MUA NGAY</h1>
        <h2 className="text-[10px]">Giao tận nơi hoặc nhận tại cửa hàng</h2>
      </button>

      <ClickBuyDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
