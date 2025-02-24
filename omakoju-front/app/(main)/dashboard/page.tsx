"use client";
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, BarChart } from "lucide-react";
import { GETuserShops, UpdateShop } from "@/app/api/shop";
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
} from "@/components/ui/dialog";
import Switch from "react-switch";

export default function Dashboard() {
  const [userShops, setUserShops] = useState<Shop[]>([]);
  const [newName, setNewName] = useState<string>();
  const [newDescription, setNewDescription] = useState<string>();
  const [newActive, setNewActive] = useState<boolean>()
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleActive = () => {
    if (newActive) {
      setNewActive(false)
    } else {
      setNewActive(true)
    }
  };

  const handleUpdate = async (shop: Shop) => {
    if (shop.id && newName && newDescription) {
      const response = await UpdateShop(shop.id, newName, newDescription, newActive!);
      console.log(response)
      if (response.ok) {
        shop.shopName = newName;
        shop.description = newDescription;
        shop.isActive = newActive!;
        setUserShops([...userShops]);
      } else {
        setErrorMessage("Shop with this name already exists")
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Shops */}
        {userShops.map((shop) => (
          <div key={shop.shopName} className="p-4 shadow-md">
            <h2 className="flex justify-between items-center">
              <div className="flex gap-8">
                <p>{shop.shopName}</p>
                {shop.isActive ? (
                  <p className="text-green-500 font-bold">Active</p>
                ) : (
                  <p className="text-red-500 font-bold">Hidden from users</p>
                )}
              </div>
              <div className="flex gap-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => {
                        setNewName(shop.shopName);
                        setNewDescription(shop.description);
                        setNewActive(shop.isActive)
                        setErrorMessage("")
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
                            setNewName(e.target.value)
                            setErrorMessage("")
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
                    </div>
                    <DialogFooter>
                      <button onClick={() => handleUpdate(shop)} className="bg-green-600 text-white p-2 rounded font-bold">
                        Save changes
                      </button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <button>
                  <Trash2 size={20} className="text-red-500" />
                </button>
              </div>
            </h2>
            <div>
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
