"use client";
import { Dispatch, SetStateAction } from "react";
import AddProductDialog from "./addProductDialog";
import ManageProducts from "./manageProducts";
import { Product } from "@/interface";

type addProduct = {
  id: string;
  products: Product[]
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export default function OwnerMenu({ id, products, setProducts }: addProduct) {
  return (
    <div className="hidden xl:flex flex-col w-[15%] gap-4 h-full absolute border-r p-4 py-8 overflow-y-auto">
      <p className="text-xs text-slate-700 mb-4">This menu shows only for the shop owner and customers won&apos;t see it.</p>
      <AddProductDialog id={id} products={products} setProducts={setProducts}/>
      <ManageProducts products={products} setProducts={setProducts}/>
    </div>
  );
}
