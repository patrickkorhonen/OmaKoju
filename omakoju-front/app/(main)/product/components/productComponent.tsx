"use client";
import Image from "next/image";
import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

interface ProductComponentProps {
  id: string;
}

// type Product = {
//   product: product;
// };

// interface product {
//   id: string;
//   shopId: string;
//   name: string;
//   price: number;
//   stock: number;
//   imageUrl: string[];
// }

const dummy = {
  item: {
    id: "1",
    shopId: "fc4a64b1-3b99-4e45-b892-49578a3db00f",
    name: "Kamera",
    price: 109.99,
    stock: 52,
    imageUrl: [
      "/photos/taulu.jpg",
      "/photos/kamera.jpg",
      "/photos/majakka.jpg",
    ],
  },
};

export default function ProductComponent({ id }: ProductComponentProps) {
  const [imageNumber, setImageNumber] = useState<number>(0);

  const handleNextImage = () => {
    if (imageNumber == dummy.item.imageUrl.length - 1) {
      setImageNumber(0);
    } else {
      setImageNumber(imageNumber + 1);
    }
  };

  const handlePreviousImage = () => {
    if (imageNumber == 0) {
      setImageNumber(dummy.item.imageUrl.length - 1);
    } else {
      setImageNumber(imageNumber - 1);
    }
  };

  return (
    <div className="min-h-screen lg:my-8 p-4 xl:p-0">
      <div className="w-full h-screen sm:h-[70vh] xl:w-2/3 grid sm:grid-cols-2 gap-8 p-4 place-self-center">
        <div className="h-[60vh]">
          <div className="relative w-full h-full bg-gray-50 rounded-xl">
            <Image
              src={dummy.item.imageUrl[imageNumber]}
              alt={"tuote"}
              layout="fill"
              objectFit="contain"
              className="rounded-xl"
            />
            <div className="flex w-full  px-4 top-1/2 justify-between absolute">
              <button
                onClick={() => handlePreviousImage()}
                className="bg-black p-2 rounded-full opacity-60 text-white hover:opacity-80"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={() => handleNextImage()}
                className="bg-black p-2 rounded-full opacity-60 text-white hover:opacity-80"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="">
            <h1 className="text-3xl font-bold">{dummy.item.name}</h1>
            <div className="">
              <p className="text-2xl tracking-wide my-8">
                {dummy.item.price} €
              </p>
              <p className="">Stock: Last Piece</p>
              <button className="w-full bg-blue-500 text-white font-bold rounded p-2">
                Add to Cart
              </button>
            </div>
          </div>
          <></>
        </div>
      </div>
    </div>
  );
}
