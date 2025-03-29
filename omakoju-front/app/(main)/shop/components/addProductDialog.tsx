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

import { Dispatch, SetStateAction, useState } from "react";
import { Product } from "@/interface";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { TiDelete } from "react-icons/ti";
import { BsUpload } from "react-icons/bs";

type addProduct = {
  shopId: string;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
};

export default function AddProductDialog({
  shopId,
  products,
  setProducts,
}: addProduct) {
  const { toast } = useToast();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const addProduct = async () => {
    if (shopId && name && price && stock) {
      const response = await CreateProduct(
        Number(shopId),
        name,
        Number(price),
        Number(stock),
        null
      );
      if (response && response.ok) {
        const data = await response.json();
        setUploading(false);
        setProducts([...products, data.product]);
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

  const updateImages = (fileList: FileList | null) => {
    let files: File[] = [];
    if (fileList) {
      files = Array.from(fileList).filter(
        (file) => file.size < 2097153
      );
    }
    if (files.length + imageUrl.length <= 6) {
      const imageArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      const newImageArray = imageUrl.concat(imageArray)
      setImageUrl(newImageArray);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="border-2 border-black rounded p-2 w-full bg-black text-white font-bold">
        Add Product +
      </DialogTrigger>
      <DialogContent className="bg-white ">
        <DialogHeader>
          <DialogTitle className="mb-4">Add a product</DialogTitle>
        </DialogHeader>
        <div className="">
          <label
            htmlFor="productName"
            className="text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            className="mb-2 p-2 w-full border border-gray-300 focus:border-border-gray-400 outline-none rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label
            htmlFor="productPrice"
            className="text-sm font-medium text-gray-700"
          >
            Product Price
          </label>
          <div className="flex items-center mb-2">
            <span className="p-2 bg-gray-200 border border-gray-300 rounded-l-md">
              €
            </span>
            <input
              type="number"
              name="productPrice"
              id="productPrice"
              className="p-2 w-full border-t border-r border-b border-gray-300 focus:border-gray-400 outline-none rounded-r-md"
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
            Product Stock
          </label>
          <input
            type="number"
            min="0"
            step="1"
            name="productStock"
            id="productStock"
            className="mb-4 p-2 w-full border border-gray-300 focus:border-gray-400 outline-none rounded-md"
            value={stock ? stock : ""}
            onChange={(e) => setStock(e.target.value)}
          />
          <label
            htmlFor="images"
            className="text-sm font-medium flex items-center gap-4 p-4 w-max mb-1 rounded-md cursor-pointer border text-gray-700 border-gray-300 hover:bg-gray-100"
          >
            <BsUpload />
            Upload Images
          </label>
          <Input
            id="images"
            name="images"
            accept=".jpg, .jpeg, .png, .avif"
            type="file"
            className="hidden"
            multiple
            onChange={(e) => updateImages(e.target.files)}
            value=""
          />
          <p className="text-xs text-slate-500 mb-4">
            Add up to 6 images. Max image size 2 MB.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:flex gap-2 overflow-x-auto">
            {imageUrl &&
              imageUrl.map((image, index) => (
                <div key={index}>
                  <div className="relative h-20 w-20">
                    <Image
                      src={image}
                      alt={`image ${index}`}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-xl border h-20 w-full z-0"
                    />
                    <TiDelete onClick={() => setImageUrl((prev) => prev?.filter((_, i) => i !== index) || null)} className="text-red-400 cursor-pointer absolute right-0 top-0 text-2xl outline-0 border-0" />
                  </div>
                </div>
              ))}
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-between">
          <DialogClose
            className="px-4 py-2 rounded cursor-pointer text-white font-semibold bg-red-500"
            asChild
          >
            <p>Close</p>
          </DialogClose>
          <DialogClose asChild>
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
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
