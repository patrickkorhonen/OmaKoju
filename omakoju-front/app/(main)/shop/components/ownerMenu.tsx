"use client";
import AddProductDialog from "./addProductDialog";

export default function OwnerMenu() {
  return (
    <div className="hidden xl:block w-[15%] h-full absolute border-r p-4 py-8">
      <AddProductDialog />
    </div>
  );
}
