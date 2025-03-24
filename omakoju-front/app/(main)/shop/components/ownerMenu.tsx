"use client";
import { Dispatch, SetStateAction } from "react";
import AddProductDialog from "./addProductDialog";
import { Product } from "@/interface";

type addProduct = {
  id: string;
  products: Product[]
  setProducts: Dispatch<SetStateAction<Product[]>>;
}

export default function OwnerMenu({ id, products, setProducts }: addProduct) {
  return (
    <div className="hidden xl:block w-[15%] h-full absolute border-r p-4 py-8">
      <AddProductDialog id={id} products={products} setProducts={setProducts}/>
    </div>
  );
}
