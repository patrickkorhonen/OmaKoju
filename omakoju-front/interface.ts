export type Role = "BUYER" | "SELLER";

export interface Session {
  token: string;
  userInfo: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}


export interface Shop {
  id: number;
  user: User;
  userId: string;
  shopName: string;
  description: string;
  isActive: boolean;
  products: [];
  orders: [];
  logoPicture: string;
  bannerPicture: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
  shop: Shop;
  name: string;
  price: number;
  stock: number;
  imageUrl: string | null;
}