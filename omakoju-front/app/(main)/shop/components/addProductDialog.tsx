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

import { useState } from "react";

export default function AddProductDialog() {
  const { toast } = useToast();
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<number>();
  //const [imageUrl, setImageUrl] = useState<null | string>(null);

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
              type="text"
              name="productStock"
              id="productStock"
              className="mb-2 p-2 w-full border border-gray-300 focus:border-black outline-none rounded-md"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button
              onClick={() => {
                toast({
                  className:
                    "bg-green-500 rounded-none border-0 text-white font-bold p-8",
                  description: "Product added succesfully",
                });
              }}
              className="bg-bgGreen hover:bg-bgGreenHover px-4 py-2 text-white font-semibold"
            >
              Add
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
