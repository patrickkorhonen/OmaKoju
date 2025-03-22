"use client";
import {
  Dialog,
  DialogContent,
  DialogClose,
  //DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CreateProduct } from "@/app/api/product";
import MoonLoader from "react-spinners/MoonLoader";

import { useState } from "react";

export default function AddProductDialog({ id }: { id: string }) {
  const { toast } = useToast();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string | null>();
  //const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [uploading, setUploading] = useState(false);

  const addProduct = async () => {
    if (id && name && price && stock) {
      const response = await CreateProduct(
        Number(id),
        name,
        Number(price),
        Number(stock),
        null
      );
      if (response && response.ok) {
        setUploading(false);
        toast({
          className:
            "bg-green-500 rounded-none border-0 text-white font-bold p-8",
          description: "Product added succesfully",
        });
      } else {
        setUploading(false);
        toast({
          className:
            "bg-red-500 rounded-none border-0 text-white font-bold p-8",
          description: "Adding product failed",
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="border-2 border-black rounded-xl p-2 w-full bg-black text-white font-bold">
        Add Product +
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="mb-4">Add a product</DialogTitle>
          <div>
            <label
              htmlFor="productName"
              className="text-sm font-medium text-gray-700"
            >
              Product Name*
            </label>
            <input
              type="text"
              name="productName"
              id="productName"
              className="mb-2 p-2 w-full border border-gray-300 focus:border-black outline-none rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="productPrice"
              className="text-sm font-medium text-gray-700"
            >
              Product Price*
            </label>
            <div className="flex items-center mb-2">
              <span className="p-2 bg-gray-200 border border-gray-300 rounded-l-md">
                €
              </span>
              <input
                type="number"
                name="productPrice"
                id="productPrice"
                className="p-2 w-full border-t border-r border-b border-gray-300 focus:border-black outline-none rounded-r-md"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <label
              htmlFor="productStock"
              className="text-sm font-medium text-gray-700"
            >
              Product Stock*
            </label>
            <input
              type="number"
              min="0"
              step="1"
              name="productStock"
              id="productStock"
              className="mb-2 p-2 w-full border border-gray-300 focus:border-black outline-none rounded-md"
              value={stock ? stock : ""}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            {/* <button
              onClick={() => {
                setUploading(true)
                addProduct()
              }}
              className="bg-bgGreen hover:bg-bgGreenHover px-4 py-2 text-white font-semibold"
            >
              Add
            </button> */}
            <div className="flex justify-between w-full">
            <button className="px-4 py-2 rounded text-white font-semibold bg-red-500">Close</button>
            {uploading ? (
              <div className="bg-bgGreen items-center flex rounded cursor-default font-bold text-white col-span-2 p-2">
                <MoonLoader
                  color={"#ffffff"}
                  cssOverride={{
                    display: "block",
                    margin: "0 auto",
                  }}
                  size={15}
                  aria-label="Loading"
                  data-testid="loader"
                />
              </div>
            ) : (
              <button
                disabled={!name || !price || !stock}
                onClick={() => {
                  setUploading(true);
                  addProduct();
                }}
                className={
                  name && price && stock
                    ? "bg-bgGreen rounded font-semibold text-white col-span-2 px-4 py-2"
                    : "bg-[#617f65] rounded cursor-default font-semibold text-white col-span-2 px-4 py-2"
                }
              >
                Add
              </button>
            )}
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
