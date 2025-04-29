

export interface IProduct {
    _id: string;
    product_name: string;
  }
  
export  interface IProductVariant {
    _id: string;
    variantName: string;
    price: number;
    salePrice: number;
    images: string[];
    product: IProduct;
  }
  
export  interface ICartItem {
    _id: string;
    productVariant: IProductVariant;
    quantity: number;
    currentPrice: number;
    currentSalePrice: number;
    totalAmount: number;
  }
  
export interface ICart {
    _id: string;
    items: ICartItem[];
    totalAmount: number;
    user: string
  }