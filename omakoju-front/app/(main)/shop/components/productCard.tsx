"use client";
import Image from "next/image";
import { Product } from "@/interface";

type product = {
  product: Product;
};


export default function ProductCard({ product }: product) {
  return (
    <div
      className={`shadow-lg relative shadow-gray-300 hover:shadow-gray-400 rounded-lg ${
        product.isActive ? "" : "opacity-40"
      }`}
    >
      {!product.isActive && (
      <p className="absolute z-10 top-1/2 text-center bg-gray-400 w-full font-semibold text-lg">Inactive</p>
      )}
      <div className="relative w-full h-40 sm:h-52">
        <Image
          src={product.imageUrl.length > 0 ? product.imageUrl[0] : "/photos/kamera.jpg"}
          alt={"tuote"}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <p className="font-semibold">{product.name}</p>
        <p className="text-gray-600 text-sm">Lyhyt kuvaus tuotteesta.</p>
        <p className="font-bold text-end mt-4 text-xl tracking-wide">
          {product.price} €
        </p>
      </div>
    </div>
  );
}
