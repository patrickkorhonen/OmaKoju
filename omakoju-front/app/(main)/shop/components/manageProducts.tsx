import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/interface";
import { IoSettingsSharp } from "react-icons/io5";
import Switch from "react-switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { DeleteProduct } from "@/app/api/product";

type manageProduct = {
  shopId: string;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
};

export default function ManageProducts({
  shopId,
  products,
  setProducts,
}: manageProduct) {
  const [newName, setNewName] = useState<string>();
  const [newPrice, setNewPrice] = useState<number>();
  const [newStock, setNewStock] = useState<number>();
  const [newActive, setNewActive] = useState<boolean>(false);

  const updateProduct = (product: Product) => {
    if (newName && newPrice && newStock) {
      product.name = newName;
      product.price = newPrice;
      product.stock = newStock;
      product.isActive = newActive;
      setProducts([...products]);
    }
  };

  const deleteProduct = async (product: Product) => {
    const response = await DeleteProduct(Number(shopId), product.id);
    if (response.ok) {
      setProducts(products.filter((item) => item.id != product.id));
    }
  };

  return (
    <main>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Manage Products</AccordionTrigger>
          <AccordionContent>
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-slate-100 flex justify-between items-center rounded p-4 my-4"
              >
                <p className="">{product.name}</p>

                <Dialog>
                  <DialogTrigger
                    onClick={() => {
                      setNewName(product.name);
                      setNewPrice(product.price);
                      setNewStock(product.stock);
                      setNewActive(product.isActive);
                    }}
                  >
                    <IoSettingsSharp className="text-lg" />
                  </DialogTrigger>
                  <DialogContent className="bg-white">
                    <DialogHeader>
                      <DialogTitle>Change product details</DialogTitle>
                      <DialogDescription>
                        Update the product details below. Make sure to save your
                        changes.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2 my-4">
                      <span className="flex gap-4 items-center">
                        <label htmlFor="name" className="w-1/5">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="border outline-0 p-2 rounded flex-1 focus:border-black"
                        />
                      </span>
                      <span className="flex gap-4 items-center">
                        <label htmlFor="price" className="w-1/5">
                          Price
                        </label>
                        <input
                          id="price"
                          type="number"
                          value={newPrice}
                          onChange={(e) => setNewPrice(Number(e.target.value))}
                          className="border outline-0 p-2 rounded flex-1 focus:border-black"
                        />
                      </span>
                      <span className="flex gap-4 items-center">
                        <label htmlFor="stock" className="w-1/5">
                          Stock
                        </label>
                        <input
                          id="stock"
                          type="number"
                          value={newStock}
                          onChange={(e) => setNewStock(Number(e.target.value))}
                          className="border outline-0 p-2 rounded flex-1 focus:border-black"
                        />
                      </span>
                      <span className="flex gap-4 items-center">
                        <label htmlFor="active" className="w-1/5">
                          Active
                        </label>
                        <Switch
                          id="active"
                          onChange={() => setNewActive(!newActive)}
                          checked={newActive}
                        />
                      </span>
                    </div>
                    <DialogFooter className="flex text-xs sm:text-base flex-row gap-4 w-full text-white font-semibold">
                      <div className="mr-auto flex gap-8">
                        <DialogClose className="text-black">Cancel</DialogClose>
                        <Dialog>
                          <DialogTrigger className="bg-red-500 p-2 rounded mr-auto">
                            Delete Product
                          </DialogTrigger>
                          <DialogContent className="bg-white">
                            <DialogHeader>
                              <DialogTitle>
                                Are you absolutely sure?
                              </DialogTitle>
                              <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete this product.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="flex w-full">
                              <DialogClose className="mr-auto">
                                Cancel
                              </DialogClose>
                              <DialogClose
                                onClick={() => deleteProduct(product)}
                                className="bg-red-500 p-2 rounded text-white font-semibold"
                              >
                                Delete
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <DialogClose
                        onClick={() => updateProduct(product)}
                        className="bg-blue-500 p-2 rounded"
                      >
                        Save Changes
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
