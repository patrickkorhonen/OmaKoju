import Image from "next/image";
import { useState } from "react";

interface ShopImageFormProps {
  handleBack: () => void;
}

export default function ShopImageForm({ handleBack }: ShopImageFormProps) {
    const [logo, setLogo] = useState("");
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
                  <button
                    className="bg-bgGreen rounded font-bold text-white col-span-2 p-2"
                  >
                    Create
                  </button>
                </div>
              </div>
  )
}

