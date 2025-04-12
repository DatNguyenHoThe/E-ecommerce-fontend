"use client";

import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function AccountMenu() {
  const router = useRouter();

  const handleLogout = () => {
    // Gọi API logout hoặc xóa token tại đây (nếu có)
    // localStorage.removeItem("token") hoặc cookie...

    // Rồi redirect về trang login
    router.push("/login");
  };

  return (
    <div className="grid grid-cols-1 w-[290px] h-[395px] bg-gray-200 p-4 gap-2">
      <h1>Icon + User</h1>
      <hr />
      <Link href="/account">Icon + Thông tin tài khoản</Link>
      <Link href="/account/address">Icon + Sổ địa chỉ</Link>
      <Link href="/account/orders">Icon + Quản lý đơn hàng</Link>
      <Link href="/account/change-password">Icon + Đổi mật khẩu</Link>
      <Link href="/">Icon + Đăng xuất</Link> {/* ở đây làm thêm bước xóa token trên local storage */}
    </div>
  );
}

