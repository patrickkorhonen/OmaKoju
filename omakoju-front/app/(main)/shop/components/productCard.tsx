"use client";
import Image from "next/image";
import { Product } from "@/interface";
import { useState } from "react";

type product = {
  product: Product;
};


export default function ProductCard({ product }: product) {
  const [imageHover, setImageHover] = useState(0)

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
          src={product.imageUrl.length > 0 ? product.imageUrl[imageHover] : "/photos/kamera.jpg"}
          alt={"tuote"}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        />
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="flex self-center gap-1">
        {product.imageUrl.length > 1 ? product.imageUrl.map((image, index) => (
          <div onMouseOver={() => setImageHover(index)} onMouseOut={() => setImageHover(0)} key={index} className={`${index === imageHover ? "bg-gray-500" : "bg-gray-300"} rounded-full p-1.5 hover:bg-gray-500`}></div>
        )) : (<div className="p-1.5"></div>)}
        </div>
        <p className="font-semibold">{product.name}</p>
        <p className="text-gray-600 text-sm">Lyhyt kuvaus tuotteesta.</p>
        <p className="font-bold text-end mt-4 text-xl tracking-wide">
          {product.price} €
        </p>
      </div>
    </div>
  );
}
