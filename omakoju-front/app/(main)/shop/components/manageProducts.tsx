import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/interface";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";

type manageProduct = {
  //id: string;
  products: Product[];
  //setProducts: Dispatch<SetStateAction<Product[]>>;
};

export default function ManageProducts({ products }: manageProduct) {
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
                <div className="flex gap-4 text-lg">
                  <IoSettingsSharp />
                  <FaRegTrashCan className="text-red-500 " />
                </div>
              </div>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
