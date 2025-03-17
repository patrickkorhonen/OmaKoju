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
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nunc turpis, pulvinar sed massa ac, tempus sollicitudin eros. Etiam semper maximus erat sed fermentum. Sed in velit eget orci mattis luctus id quis lorem. Ut risus lorem, commodo in porta.",
    imageUrl: [
      "/photos/taulu.jpg",
      "/photos/kamera.jpg",
      "/photos/majakka.jpg",
      "/photos/taulu.jpg",
      "/photos/kamera.jpg",
      "/photos/majakka.jpg",
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
                className="bg-black p-4 rounded-full opacity-60 text-white hover:opacity-80"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={() => handleNextImage()}
                className="bg-black p-4 rounded-full opacity-60 text-white hover:opacity-80"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
          <div className="flex flex-nowrap gap-4 overflow-x-auto my-4">
            {dummy.item.imageUrl.map((image, index) => (
              <div key={index}>
                <button
                  onClick={() => setImageNumber(index)}
                  className="relative h-20 w-20"
                >
                  <Image
                    src={image}
                    alt={"tuote"}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-xl border h-20 w-full"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-2">
            <h1 className="text-4xl ">{dummy.item.name}</h1>
            <div className="flex flex-col gap-8 my-8">
              <p className="text-xl tracking-wide">{dummy.item.price} €</p>
              <p className="">Stock: Last Piece</p>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded p-2">
                Add to Cart
              </button>
              <p className="tracking-wide">{dummy.item.description}</p>
            </div>
          </div>
          <></>
        </div>
      </div>
    </div>
  );
}
