import Image from 'next/image'
import React from 'react'
import MenuHeader from './MenuHeader'
import IconHeader from './IconHeader'

export default function Header() {
  return (
    <>
    <div className='flex items-center justify-center w-full bg-[#1982F9]'>
      <Image
      alt='banner-header'
      src='http://localhost:8889/uploads/banners/thang_04_laptop_gaming_banner_0087e9.webp'
      width={1200}
      height={47}
      />
    </div>
    <div className='h-18 bg-[#E30019] flex items-center justify-center sticky top-0 left-0 w-full z-50'>
      <div className='w-[1200px] h-[42px] flex gap-x-3'>
        <div className='relative w-35 block'>
          <Image
            alt='logo'
            src='http://localhost:8889/uploads/logos/logo_header.png'
            fill
          />
        </div>
        <MenuHeader />
        <div className="flex items-center bg-white border border-gray-300 rounded-sm px-4 py-2 w-full max-w-md shadow-sm">
          <input
            type="text"
            placeholder="Bạn cần tìm gì?"
            className="w-full outline-none bg-transparent placeholder-gray-600 text-gray-800"
          />
          <i className="bi bi-search text-gray-600"></i>
      </div>
      <div className='flex gap-x-4 p-1'>
        <IconHeader 
        icon = {<i className="bi bi-headset"></i>}
        title= {<>Hotline<br />1900.5301</>}
        url='/'
        />
        <IconHeader 
        icon = {<i className="bi bi-geo-alt"></i>}
        title= {<>Hệ thống<br />Showroom</>}
        url='/pages/he-thong-showroom-gearvn'
        />
        <IconHeader 
        icon = {
        <div className="flex relative">
          <i className="bi bi-clipboard2"></i>
          <i className="bi bi-clock-fill bottom-0 end-0 rounded-circle absolute" 
          style={{fontSize: '0.75rem'}}>
          </i>
        </div>
        }
        title= {<>Tra cứu<br />đơnhàng</>}
        url='/account/orders'
        />
        <IconHeader 
        icon = {<i className="bi bi-cart3"></i>}
        title = {<>Giỏ<br />hàng</>}
        url = '/cart'
        />
      </div>
        <div className='flex items-center text-white font-bold gap-x-1 px-2 bg-[#be0117] rounded-sm'>
          <IconHeader 
          icon = {<i className="bi bi-person"></i>}
          title = {<>Đăng<br />nhập</>}
          url = '/login'
          />
        </div>
      </div>
    </div>
    </>
  )
}
