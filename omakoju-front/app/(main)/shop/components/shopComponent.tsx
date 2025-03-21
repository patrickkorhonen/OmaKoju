"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GETshop } from "@/app/api/shop";
import PropagateLoader from "react-spinners/PropagateLoader";
//import { getUser } from "@/lib";
import ProductCard from "./productCard";
import Link from "next/link";
import OwnerMenu from "./ownerMenu";
import { GetProducts } from "@/app/api/product";
import { Product } from "@/interface";

interface ShopComponentProps {
  id: string;
}

export default function ShopComponent({ id }: ShopComponentProps) {
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  //const [owner, setOwner] = useState(false);
  const [logo, setLogo] = useState<null | string>(null);
  const [banner, setBanner] = useState<null | string>(null);
  const [products, setProducts] = useState<Product[]>()

  useEffect(() => {
    const fetchShop = async () => {
      console.log("kauppa haetaan")
      const response = await GETshop(id);
      if (response && response.ok) {
        const data = await response.json();
        setName(data.shopName);
        setDescription(data.description);
        setLogo(data.logoPicture);
        setBanner(data.bannerPicture);
        //const userFetch = await getUser();
        // if (userFetch != undefined) {
          // if (userFetch.id === data.userId) setOwner(true);
        // }
      } else {
        window.location.replace("/");
      }
    };
    fetchShop();
  }, [id]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await GetProducts(id)
      if (response && response.ok) {
        const data = await response.json()
        console.log(data)
        setProducts(data)
      }
    }
    fetchProducts()
  }, [id])

  return (
    <main className="min-h-screen p-4 xl:p-0 bg-white">
      <OwnerMenu id={id}/>
      {name && description ? (
        <div className="w-full xl:w-2/3 px-2 xl:px-0 mb-8 lg:pt-8 place-self-center">
          <div className="flex w-full h-full place-self-center rounded-xl mb-8">
            {banner ? (
              <Image
                src={banner}
                alt={name}
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                className="rounded-xl object-cover"
              />
            ) : (
              <Image
                src={"/photos/default_banner.png"}
                alt={name}
                width={0}
                height={0}
                style={{ width: "100%", height: "auto" }}
                className="rounded-xl object-cover"
              />
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-4">
            <div className="flex gap-2 lg:col-span-2 sm:gap-8 h-24 sm:h-40">
              <div className="relative w-24 h-24 sm:h-40 sm:w-40 p-2">
                {logo ? (
                  <Image
                    src={logo}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <Image
                    src={"/photos/computer-profile.avif"}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="flex flex-col justify-between h-full">
                <p className="font-bold text-xl sm:text-4xl">{name}</p>
                <span>
                  <p className="text-slate-500 text-sm">
                    dummyemail@example.com
                  </p>
                  <p className="text-slate-500 text-sm">08012345678</p>
                  <p className="text-slate-500 text-sm">Lagos, Nigeria</p>
                </span>
              </div>
            </div>
            <div className="h-full w-full ml-auto p-4 cursor-default bg-slate-100 rounded-md overflow-y-scroll">
              {description}
            </div>
          </div>
          <hr className="my-8"></hr>
          <div className="grid gap-4 sm:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
            {products && products.map((item, index) => (
              <div key={index}>
                <Link href={`/product/${item.id}`}>
                  <ProductCard product={item} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <PropagateLoader
            color={"#000000"}
            cssOverride={{
              display: "block",
              margin: "0 auto",
              borderColor: "black",
            }}
            size={10}
            aria-label="Loading"
            data-testid="loader"
          />
        </div>
      )}
      
    </main>
  );
}
