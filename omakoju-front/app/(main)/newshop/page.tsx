"use client";
import { useState } from "react";
import ShopImageForm from "@/app/components/shopImageForm";

export default function Newshop() {
  const [shopName, setShopName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  //const [bannerUrl, setBannerUrl] = useState("");
  //const [loading, setLoading] = useState(false);
  const [formPage, setFormPage] = useState(1);

  const handleNext = () => {
    if (formPage === 1) {
      setFormPage(2);
    }
  };

  const handleBack = () => {
    if (formPage === 2) {
      setFormPage(1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-12 bg-[#e4d5b7]">
      <div className="flex gap-2 m-2">
        <span
          className={
            formPage === 1
              ? "rounded-full h-3 w-3 bg-black block"
              : "rounded-full h-3 w-3 bg-white block"
          }
        ></span>
        <span
          className={
            formPage === 2
              ? "rounded-full h-3 w-3 bg-black block"
              : "rounded-full h-3 w-3 bg-white block"
          }
        ></span>
      </div>
      <div className="bg-white rounded-lg p-4 w-1/4">
        <h2 className="text-2xl text-center font-bold mb-4">
          Create a new Shop
        </h2>
        {formPage === 1 ? (
          <div>
            <label
              htmlFor="shopName"
              className="text-sm font-medium text-gray-700"
            >
              Shop Name*
            </label>
            <input
              type="text"
              name="shopName"
              id="shopName"
              className="mb-2 p-2 w-full border border-gray-300 focus:border-black outline-none rounded-md"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="p-2 w-full border border-gray-300 focus:border-black outline-none rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-xs mb-2 text-gray-700">
              Email will be visible for customers
            </p>
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700"
            >
              Phone number
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="p-2 w-full border border-gray-300 focus:border-black outline-none rounded-md"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <p className="text-xs mb-2 text-gray-700">
              Phone number will be visible for customers
            </p>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description*
            </label>
            <textarea
              name="description"
              id="description"
              className="p-2 w-full mb-2 border border-gray-300 focus:border-black outline-none rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="grid grid-cols-3 gap-4">
              <button className="bg-red-500 text-white rounded font-bold p-2">
                Cancel
              </button>
              <button
                onClick={() => handleNext()}
                className="bg-bgGreen rounded font-bold text-white col-span-2 p-2"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div>
            <ShopImageForm handleBack={handleBack} />
          </div>
        )}
      </div>
    </div>
  );
}
