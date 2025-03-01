"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, BarChart } from "lucide-react";
import { GETuserShops, UpdateShop } from "@/app/api/shop";
import LogoDialog from "./components/logoDialog";
import BannerDialog from "./components/bannerDialog";
import { Shop } from "@/interface";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Switch from "react-switch";
import Image from "next/image";

export default function Dashboard() {
  const [userShops, setUserShops] = useState<Shop[]>([]);
  const [newName, setNewName] = useState<string>();
  const [newDescription, setNewDescription] = useState<string>();
  const [newActive, setNewActive] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [newLogo, setNewLogo] = useState<string>();
  const [newBanner, setNewBanner] = useState<string>();

  const handleActive = () => {
    if (newActive) {
      setNewActive(false);
    } else {
      setNewActive(true);
    }
  };

  const handleNewLogo = (logo: string) => {
    setNewLogo(logo)
  }

  const handleNewBanner = (banner: string) => {
    setNewBanner(banner)
  }

  const handleUpdate = async (shop: Shop) => {
    if (shop.id && newName && newDescription && newLogo && newBanner) {
      let bannerUpdate = null
      if (shop.bannerPicture != newBanner && "/photos/default_banner.png" != newBanner) {
       bannerUpdate = newBanner 
      }
      const response = await UpdateShop(
        shop.id,
        newName,
        newDescription,
        newActive!,
        newLogo === shop.logoPicture ? null : newLogo!,
        bannerUpdate
      );
      console.log(response);
      if (response.ok) {
        shop.shopName = newName;
        shop.description = newDescription;
        shop.isActive = newActive!;
        shop.logoPicture = newLogo!;
        shop.bannerPicture = newBanner!;
        setUserShops([...userShops]);
      } else {
        setErrorMessage("Shop with this name already exists");
      }
    }
  };

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
            <div className="flex gap-6 items-centerpb-4">
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
                  width={0}
                  height={0}
                  style={{ width: "100%", height: "auto" }}
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
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => {
                        setNewName(shop.shopName);
                        setNewDescription(shop.description);
                        setNewActive(shop.isActive);
                        setErrorMessage("");
                        setNewLogo(shop.logoPicture)
                        setNewBanner(shop.bannerPicture ? shop.bannerPicture : "/photos/default_banner.png")
                      }}
                    >
                      <Pencil size={20} />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle>Edit shop</DialogTitle>
                      <DialogDescription>
                        Make changes to your shop here.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">
                          Shop name
                        </label>
                        <span className="flex flex-col col-span-3">
                          <input
                            id="name"
                            className="p-2 border rounded"
                            value={newName}
                            onChange={(e) => {
                              setNewName(e.target.value);
                              setErrorMessage("");
                            }}
                          />
                          {errorMessage && (
                            <p className="text-red-500">{errorMessage}</p>
                          )}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="description" className="text-right">
                          Description
                        </label>
                        <textarea
                          id="description"
                          className="col-span-3 max-h-80 border rounded p-2"
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="active" className="text-right">
                          active
                        </label>
                        <Switch
                          id="active"
                          onChange={() => handleActive()}
                          checked={newActive!}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="logo" className="text-right">
                          logo
                        </label>
                        <LogoDialog logo={newLogo!} handleNewLogo={handleNewLogo}/>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="banner" className="text-right">
                          banner
                        </label>
                        <BannerDialog banner={newBanner!} handleNewBanner={handleNewBanner}/>
                      </div>
                    </div>
                    <DialogFooter>
                      <div className="flex justify-between w-full">
                        <DialogClose>
                          <div className="bg-red-600 text-white p-2 rounded font-bold">
                            Cancel
                          </div>
                        </DialogClose>
                        <button
                          onClick={() => handleUpdate(shop)}
                          className="bg-green-600 text-white p-2 rounded font-bold"
                        >
                          Save changes
                        </button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <button>
                  <Trash2 size={20} className="text-red-500" />
                </button>
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
