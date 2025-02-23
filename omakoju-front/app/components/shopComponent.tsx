"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GETshop } from "@/app/api/shop";

interface ShopComponentProps {
  id: string;
}

export default function ShopComponent({ id }: ShopComponentProps) {
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();

  useEffect(() => {
    const fetchShop = async () => {
      const response = await GETshop(id);
      if (response) {
        const data = await response.json();
        setName(data.shopName);
        setDescription(data.description);
        console.log("dataaaaa", data);
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
              <Image
                src={"/photos/computer-profile.avif"}
                alt={name}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
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
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
