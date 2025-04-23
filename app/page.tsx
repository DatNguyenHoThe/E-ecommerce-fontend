import Image from "next/image";
import { CategoryMenu } from "./ui/CategoryMenu";
import MainBanners from "./ui/MainBanners";
import PromoBox from "./ui/PromoBox";
import CategoryBox from "./ui/CategoryBox";
import ProductBox from "./ui/ProductBox";
import FlashSaleBox from "./ui/FlashSaleBox";
import TechBoxSmall from "./ui/techNew/TechBoxSmall";




export default function Home() {
  
  const promoBoxs = [
    {
      name: 'thang_04_layout_web__01',
      imgUri: 'http://localhost:8889/uploads/services/thang_04_layout_web__01.webp',
      link: '/pages/bang-gia-thu-san-pham-cu'
    },
    {
      name: 'thang_04_layout_web__02',
      imgUri: 'http://localhost:8889/uploads/services/thang_04_layout_web__02.webp',
      link: '/products/ban-phim'
    },
    {
      name: 'thang_04_layout_web__03',
      imgUri: 'http://localhost:8889/uploads/services/thang_04_layout_web__03.webp',
      link: '/products/pc-gvn-intel-i5-4060'
    },
    {
      name: 'thang_04_layout_web__04',
      imgUri: 'http://localhost:8889/uploads/services/thang_04_layout_web__04.webp',
      link: '/products/lap-top-gaming'
    },
    {
      name: 'thang_04_layout_web__05',
      imgUri: 'http://localhost:8889/uploads/services/thang_04_layout_web__05.webp',
      link: '/products/lap-top-van-phong'
    },
    {
      name: 'thang_04_banner_ver_2024_500x250',
      imgUri: 'http://localhost:8889/uploads/services/thang_04_banner_ver_2024_500x250.webp',
      link: '/pages/gvn-gaming-festival'
    },
    {
      name: 'thang_04_layout_web__06',
      imgUri: 'http://localhost:8889/uploads/services/thang_04_layout_web__06.webp',
      link: '/products/man-hinh'
    },
    {
      name: 'thang_04_layout_web__07',
      imgUri: 'http://localhost:8889/uploads/services/thang_04_layout_web__07.webp',
      link: '/products/chuot'
    },
    {
      name: 'thang_04_layout_web__08',
      imgUri: 'http://localhost:8889/uploads/services/thang_04_layout_web__08.webp',
      link: '/products/pc-gvn-intel-i5-rx6600'
    },
  ];

  return (
    <div className="grid justify-center bg-gray-100 pt-2 pb-2">
      <div className="w-[1200px]">
        <div className="flex gap-x-2">
          <CategoryMenu />
          <div>
            <MainBanners />
            <div className="h-[163px] flex gap-x-5">
              {promoBoxs.slice(3,5).map((item, index) => (
                <PromoBox 
                  key={index}
                  name={item.name}
                  imgUri={item.imgUri}
                  link={item.link}
                />
              ))}
            </div> 
          </div>
          <div className="h-[326px] grid grid-cols-1 gap-y-5">
            {promoBoxs.slice(0,3).map((item, index) => (
              <PromoBox 
                key={index}
                name={item.name}
                imgUri={item.imgUri}
                link={item.link}
              />
            ))}
          </div>
        </div>
        <div className="h-[163px] flex gap-x-5">
          {promoBoxs.slice(5,9).map((item, index) => (
            <PromoBox 
              key={index}
              name={item.name}
              imgUri={item.imgUri}
              link={item.link}
            />
          ))}
        </div>
        <div>
          <FlashSaleBox />
        </div>
        <div>
          <ProductBox 
          title="Sản phẩm bán chạy"
          type="bestsale"
          />
        </div>
        <div>
          <ProductBox 
          title="PC"
          type="pc"
          />
        </div>
        <div>
          <ProductBox 
          title="Laptop"
          type="laptop"
          />
        </div>
        <div>
          <ProductBox 
          title="Chuột máy tính"
          type="chuot"
          />
        </div>
        <div>
          <ProductBox 
          title="Bàn Phím"
          type="ban-phim"
          />
        </div>
        
        <div>
          <CategoryBox />
        </div>
        <div>
          <TechBoxSmall />
        </div>
      </div>
    </div>
  );
}
