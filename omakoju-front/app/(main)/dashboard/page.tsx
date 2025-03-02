"use client";
import { useState, useEffect } from "react";
import { Plus, BarChart } from "lucide-react";
import { GETuserShops } from "@/app/api/shop";
import { Shop } from "@/interface";
import Link from "next/link";
import DeleteShopDialog from "./components/deleteShopDialog";
import Image from "next/image";
import ModifyShopDialog from "./components/modifyShopDialog";

export default function Dashboard() {
  const [userShops, setUserShops] = useState<Shop[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await GETuserShops();
      const data = await response.json();
      if (data) {
        setUserShops(data);
      }
    };
    fetchData();
  }, []);

  //TODO: fix the dialog closing only if name is changed.

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">My Shops</h1>

      {/* Quick Actions */}
      <div className="flex justify-between mb-6">
        <Link
          href={"/newshop"}
          className="flex items-center bg-gray-200 p-2 rounded gap-2"
        >
          <Plus size={20} />
          Add New Shop
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 min-[1700px]:grid-cols-3 gap-6">
        {/* User Shops */}
        {userShops.map((shop) => (
          <div key={shop.shopName} className="p-4 shadow-xl border rounded-xl">
            <div className="flex gap-2 sm:gap-6 items-centerpb-4">
              <div className="relative">
                <Image
                  src={shop.logoPicture || "/photos/computer-profile.avif"}
                  alt={"name"}
                  width={300}
                  height={300}
                  //style={{ width: "80%", height: "auto" }}
                  className="rounded-full border"
                />
              </div>
              <div className="relative">
                <Image
                  src={shop.bannerPicture || "/photos/default_banner.png"}
                  alt={"name"}
                  width={1500}
                  height={300}
                  //style={{ width: "100%", height: "auto" }}
                  className="rounded-xl border"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-between mt-4 items-center">
              <div className="flex gap-8 items-center">
                <p className="text-xl font-semibold">{shop.shopName}</p>
                {shop.isActive ? (
                  <p className="text-green-500 font-bold">Active</p>
                ) : (
                  <p className="text-red-500 font-bold">Hidden from users</p>
                )}
              </div>
              <Link href={`/shop/${shop.id}`}>
                <button className="bg-black rounded text-white font-bold text-sm px-4 py-2">
                  Go to Shop
                </button>
              </Link>
              <div className="flex gap-4">
                <ModifyShopDialog shop={shop} userShops={userShops} setUserShops={setUserShops}/>
                <DeleteShopDialog id={shop.id} name={shop.shopName}/>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">{shop.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <h2 className="text-2xl font-semibold mt-10 mb-4">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 shadow-md">
          <h2 className="flex justify-between items-center">
            <p>Total Sales</p>
            <BarChart size={24} />
          </h2>
          <div>
            <p className="text-3xl font-bold">12,450 €</p>
          </div>
        </div>
        <div className="p-4 shadow-md">
          <h2 className="flex justify-between items-center">
            <p>Orders</p>
            <BarChart size={24} />
          </h2>
          <div>
            <p className="text-3xl font-bold">342</p>
          </div>
        </div>
        <div className="p-4 shadow-md">
          <h2 className="flex justify-between items-center">
            <p>Revenue</p>
            <BarChart size={24} />
          </h2>
          <div>
            <p className="text-3xl font-bold">98,200 €</p>
          </div>
        </div>
      </div>
    </div>
  );
}
