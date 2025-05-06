import { Home, Star } from "lucide-react";
import Link from "next/link";
import ProductGallery from "../../../components/SwiperClientComponent";
import ProductCard from "@/components/ProductCard";

interface Product {
  _id: string;
  product_name: string;
  description: string;
  slug: string;
  price: number;
  stock: number;
  images: string[];
  category: ICategory;
  attributes: (string | { name: string; value: string; time?: string })[];
  rating: number;
  Brand: Brand;
  reviewCount: number;
  tags: string[];
  originalPrice?: number;
}

interface ICategory {
  _id: string;
  category_name: string;
}

interface Brand {
  _id: string;
  brand_name: string;
}

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // Fetch product
  const {slug} = await params;
  console.log('slug===>', slug);
  const res = await fetch(
    `http://localhost:8889/api/v1/products/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error('fetching data is failed', res);
    return <div className="p-6">Không thể tải dữ liệu sản phẩm.</div>;
  }

  const data = await res.json();
  const product: Product = data.data;

  // Fetch actual category name
  let categoryName = "Danh mục";
  console.log("category", product.category);
  try {
    const categoryRes = await fetch(
      `http://localhost:8889/api/v1/categories/${product.category}`,
      { cache: "no-store" }
    );
    if (categoryRes.ok) {
      const categoryData = await categoryRes.json();
      categoryName = categoryData.data?.category_name || categoryName;
    }
  } catch (error) {
    console.error("Lỗi khi lấy category:", error);
  }

  // Fetch similar products
  let similarProducts: Product[] = [];
  try {
    const similarRes = await fetch(
      `http://localhost:8889/api/v1/products?category_name=${categoryName}&limit=5`,
      { cache: "no-store" }
    );
    if (similarRes.ok) {
      const similarData = await similarRes.json();
      similarProducts = similarData.data.products.filter(
        (p: Product) => p._id !== product._id
      );
    }
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm tương tự:", error);
  }

  const originalPrice = product.originalPrice || product.price * 1.25;
  const discountPercent = Math.round(
    100 - (product.price / originalPrice) * 100
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-gray-600 mb-8 text-[15px]">
        <Home className="text-blue-500" />
        <Link href="/" className="hover:underline text-blue-600">
          Trang chủ
        </Link>
        <span>/</span>
        <Link
          href={`/collections/${categoryName}`}
          className="hover:underline text-blue-600"
        >
          {categoryName}
        </Link>
        <span>/</span>
        <span className="font-medium capitalize">{product.product_name}</span>
      </div>

      <div className="max-w-5xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="justify-center mb-6 md:mb-0">
          <ProductGallery
            images={product.images}
            productName={product.product_name}
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-semibold mb-4">
            {product.product_name}
          </h1>

          <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
            <Star size={18} className="text-yellow-500" />
            <span>{product.rating.toFixed(1)}</span>
            <p className="text-blue-500">Xem đánh giá</p>
          </div>

          <div className="mb-6 flex items-center space-x-4 text-lg">
            <span className="line-through text-gray-400 text-base">
              {formatPrice(originalPrice)}
            </span>
            <span className="text-red-600 font-bold text-xl">
              {formatPrice(product.price)}
            </span>
            {discountPercent > 0 && (
              <span className="text-xs text-white bg-red-500 px-2 py-0.5 rounded">
                -{discountPercent}%
              </span>
            )}
          </div>

          <div className="mt-8">
            <button className="w-[300px] py-2 bg-red-600 text-white font-semibold rounded-[3px]">
              <h1 className="text-[15px]">MUA NGAY</h1>
              <h2 className="text-[10px]">
                Giao tận nơi hoặc nhận tại cửa hàng
              </h2>
            </button>
          </div>

          <div className="bg-gray-100 rounded-md text-sm p-4 mb-6 mt-8">
            <h3 className="font-semibold mb-2">Đặc điểm nổi bật</h3>
            <ul className="space-y-2">
              {product.attributes.map((attr, index) => (
                <li key={index} className="text-gray-700">
                  🔹{" "}
                  {typeof attr === "string"
                    ? attr
                    : `${attr.name}: ${attr.value}${
                        attr.time ? ` (${attr.time})` : ""
                      }`}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-md text-sm p-4 mb-6">
            <h3 className="font-semibold mb-2">Mô tả sản phẩm</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {product.tags.length > 0 && (
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm text-gray-600 bg-gray-200 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-6 mt-12">
            Sản phẩm tương tự
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {similarProducts.map((similarProduct) => (
              <ProductCard
                key={similarProduct._id}
                product={similarProduct}
                category={categoryName}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}