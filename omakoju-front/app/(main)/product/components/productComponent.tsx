"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { GetProduct } from "@/app/api/product";
import { Product } from "@/interface";
import { PiSmileySadLight } from "react-icons/pi";

interface ProductComponentProps {
  id: string;
}

export default function ProductComponent({ id }: ProductComponentProps) {
  const [imageNumber, setImageNumber] = useState<number>(0);
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await GetProduct(id);
      if (response && response.ok) {
        const data = await response.json();
        console.log("tämä on tuote", data);
        setProduct(data);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleNextImage = () => {
    if (imageNumber == product!.imageUrl.length - 1) {
      setImageNumber(0);
    } else {
      setImageNumber(imageNumber + 1);
    }
  };

  const handlePreviousImage = () => {
    if (imageNumber == 0) {
      setImageNumber(product!.imageUrl.length - 1);
    } else {
      setImageNumber(imageNumber - 1);
    }
  };
  return (
    <div className="sm:min-h-screen lg:my-8 p-4 xl:p-0 ">
      {product && (
        <main>
          <div className="w-full sm:h-[70vh]  xl:w-2/3 grid sm:grid-cols-2 gap-8 p-4 place-self-center mb-40">
            <div className="sm:h-[60vh] h-60 ">
              <div className="relative w-full h-full bg-gray-50 rounded-xl">
                <Image
                  src={product.imageUrl[imageNumber]}
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
              <div className="hidden sm:flex gap-4 overflow-x-auto my-4 ">
                {product.imageUrl.map((image, index) => (
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
            <div className="grid grid-cols-3 ">
              <div className="sm:col-span-3 2xl:col-span-2">
                <p className="text-sm">{product.shop.shopName}</p>
                <p className="text-4xl">{product.name}</p>
                <div className="flex flex-col gap-8 my-8">
                  <p className="text-xl tracking-wide">{product.price} €</p>
                  <p className="">Stock: {product.stock}</p>
                  <div className="flex flex-col gap-2">
                    <button className="w-full border border-blue-500 hover:shadow-sm hover:shadow-blue-600  text-blue-500 font-bold rounded p-2">
                      Add to Cart
                    </button>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold rounded p-2">
                      Buy Now
                    </button>
                  </div>
                  <p className="tracking-wide">tuotteen kuvaus</p>
                </div>
              </div>
              <></>
            </div>
          </div>
          <hr className="mx-10"></hr>
        </main>
      )}
      {!product && !loading && (
        <main className="min-h-screen flex gap-2 justify-center items-center -mt-16">
          <p className="text-2xl">Product Not Found</p>
          <PiSmileySadLight className="text-2xl" />
        </main>
      )}
    </div>
  );
}
