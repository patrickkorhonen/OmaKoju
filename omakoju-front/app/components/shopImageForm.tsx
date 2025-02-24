import Image from "next/image";
import { useState } from "react";
import { CreateShop } from "../api/shop";

interface ShopImageFormProps {
  handleBack: () => void;
  shopName: string;
  description: string;
}

export default function ShopImageForm({
  handleBack,
  shopName,
  description,
}: ShopImageFormProps) {
  const [logo, setLogo] = useState("");

  const createShop = async () => {
    console.log("eka täällä", shopName, description)
    if (shopName && description) {
      const response = await CreateShop(shopName, description);
      if (response && response.ok) {
        window.location.replace("/")
      } else {
        console.log("Error encountered while creating the shop.")
      }
    }
  };

  return (
    <div>
      <label htmlFor="logo" className="text-sm font-medium text-gray-700">
        Logo*
      </label>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        name="logo"
        id="logo"
        className="p-4 mb-4 w-full border border-gray-300 focus:border-black outline-none rounded-md"
        onChange={(e) => {
          if (e.target.files) {
            setLogo(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
      {logo && (
        <div className="">
          <div className="relative w-32 h-32">
            <Image
              src={logo}
              alt="Logo Preview"
              layout="fill"
              objectFit="cover"
              className="rounded-full border"
            />
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={handleBack}
          className="bg-red-500 text-white rounded font-bold p-2"
        >
          Back
        </button>
        <button disabled={!shopName && !description} onClick={() => createShop()} className={shopName && description ? "bg-bgGreen rounded font-bold text-white col-span-2 p-2" : "bg-[#617f65] rounded font-bold text-white col-span-2 p-2"}>
          Create
        </button>
      </div>
    </div>
  );
}
