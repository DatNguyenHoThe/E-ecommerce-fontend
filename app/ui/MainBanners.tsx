"use client"

import Image from 'next/image'
import React, { useState } from 'react'

export default function MainBanners() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const banners = [
        {
            name: 'thang_04_laptop_gaming_banner_web_slider_800x400',
            imgUrl: 'http://localhost:8889/uploads/banners/thang_04_laptop_gaming_banner_web_slider_800x400.webp',
        },
        {
            name: 'thang_04_laptop_acer',
            imgUrl: 'http://localhost:8889/uploads/banners/thang_04_laptop_acer.webp',
        },
        {
            name: 'thang_04_banner_web_slider_800x400',
            imgUrl: 'http://localhost:8889/uploads/banners/thang_04_banner_web_slider_800x400.webp',
        },
        {
            name: 'thang_04_acer_laptop_800x400',
            imgUrl: 'http://localhost:8889/uploads/banners/thang_04_acer_laptop_800x400.webp',
        },
        {
            name: 'thang_03_thu_cu_doi_moi_banner_web_slider_800x400',
            imgUrl: 'http://localhost:8889/uploads/banners/thang_03_thu_cu_doi_moi_banner_web_slider_800x400.webp',
        },
        {
            name: 'thang_03_laptop_rtx_5090_800x400',
            imgUrl: 'http://localhost:8889/uploads/banners/thang_03_laptop_rtx_5090_800x400.webp',
        },
        {
            name: 'thang_02_pc_gvn_banner_web_slider_800x400',
            imgUrl: 'http://localhost:8889/uploads/banners/thang_02_pc_gvn_banner_web_slider_800x400.webp',
        },
        {
            name: 'banner_web_slider_800x400_1199a3adfc23489798d4163a97f3bc62',
            imgUrl: 'http://localhost:8889/uploads/banners/banner_web_slider_800x400_1199a3adfc23489798d4163a97f3bc62.webp',
        },
        {
            name: 'thang_12_laptop_acer_swift_800x400',
            imgUrl: 'http://localhost:8889/uploads/banners/thang_12_laptop_acer_swift_800x400.webp',
        },
        {
            name: 'banner_homepage_acer_rtx_5000',
            imgUrl: 'http://localhost:8889/uploads/banners/banner_homepage_acer_rtx_5000.webp',
        },
    ]

  return (
    <div className='relative w-[651px] h-[326px] flex justify-center'>
        <Image 
        alt={banners[currentIndex].name}
        src={banners[currentIndex].imgUrl}
        width={651}
        height={326}
        className='rounded-sm'
        />
        <div className="absolute bottom-6 flex gap-x-2">
            {banners.slice(0).map((_, index) => (
            <div
            onClick={() => {
                setCurrentIndex(index);
            }} 
            key={index} 
            className={` w-5 h-1 cursor-pointer ${index === currentIndex ? 'bg-red-500' : 'bg-gray-400'}`}
            ></div>
            ))}
        </div>
    </div>
  )
}
