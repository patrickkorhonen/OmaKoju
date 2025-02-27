"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GETshop } from "@/app/api/shop";
import PropagateLoader from "react-spinners/PropagateLoader";
import { getUser } from "@/lib";

interface ShopComponentProps {
  id: string;
}

export default function ShopComponent({ id }: ShopComponentProps) {
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [owner, setOwner] = useState(false);
  const [logo, setLogo] = useState<null | string>(null);

  useEffect(() => {
    const fetchShop = async () => {
      const response = await GETshop(id);
      if (response && response.ok) {
        const data = await response.json();
        setName(data.shopName);
        setDescription(data.description);
        setLogo(data.logoPicture);
        console.log(data.logoPicture)
        const userFetch = await getUser();
        if (userFetch != undefined) {
          if (userFetch.id === data.userId) setOwner(true);
        }
      } else {
        window.location.replace("/");
      }
    };
    fetchShop();
  });

  return (
    <main className="min-h-screen my-4 bg-white">
      {name && description ? (
        <div className="w-2/3 place-self-center">
          <div className="flex w-full h-60 place-self-center rounded-xl mb-4">
            <Image
              src={"/photos/banner.jpg"}
              alt={name}
              width={0}
              height={0}
              style={{ width: "100%", height: "auto" }}
              className="rounded-xl object-cover"
            />
          </div>
          <section className="grid grid-cols-7 gap-4 h-40 overflow-hidden">
            <div className="relative w-40 h-40">
              {logo ? (
                <Image
                  src={logo}
                  alt={name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
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
            <div className="flex flex-col justify-between h-40 col-span-2">
              <p className="font-bold text-4xl">{name}</p>
              <span>
                <p className="text-slate-500 text-sm">dummyemail@example.com</p>
                <p className="text-slate-500 text-sm">08012345678</p>
                <p className="text-slate-500 text-sm">Lagos, Nigeria</p>
              </span>
            </div>
            <div className="col-span-4 h-40 p-4 cursor-default bg-slate-100 rounded-md overflow-y-scroll">
              {description}
            </div>
          </section>
          <hr className="my-4"></hr>
          {owner && <div>omistaja</div>}
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
