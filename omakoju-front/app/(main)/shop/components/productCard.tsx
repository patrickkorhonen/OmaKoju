"use client";
import Image from "next/image";

type Product = {
  product: product;
};

interface product {
  id: string;
  shopId: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string[];
}

export default function ProductCard({ product }: Product) {
  return (
    <div className="shadow-lg shadow-gray-300 hover:shadow-gray-400 rounded-xl">
      <div className="relative w-full h-40 sm:h-64">
        <Image
          src={product.imageUrl[0]}
          alt={"tuote"}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="font-semibold">{product.name}</p>
        <p className="text-gray-600 text-sm">Lyhyt kuvaus tuotteesta.</p>
        <p className="font-bold text-end my-2 text-xl tracking-wide">{product.price} €</p>
      </div>
    </div>
  );
}
