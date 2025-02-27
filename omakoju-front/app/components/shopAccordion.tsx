import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { GETshops } from "../api/shop";

interface shop {
  id: string;
  shopName: string;
  description: string;
  logoPicture: string | null;
  bannerPicture: string | null;
}

const TrendingShops = () => {
  const [shops, setShops] = useState<shop[]>([]);

  useEffect(() => {
    const fetchShops = async () => {
      const response = await GETshops();
      if (response) {
        const data = await response.json();
        setShops(data);
      }
    };
    fetchShops();
  }, []);

  return (
    <Accordion
      className="flex flex-col gap-20"
      defaultValue={["trending", "new", "favorites"]}
      type="multiple"
    >
      <AccordionItem
        value="trending"
        className=" bg-gray-50 p-4 rounded-xl border-0"
      >
        <AccordionTrigger className="text-xl uppercase font-bold rounded hover:no-underline">
          Trending
        </AccordionTrigger>
        <AccordionContent>
          <Carousel className="mx-12 ">
            <CarouselPrevious className="text-2xl font-bold h-full rounded"></CarouselPrevious>
            <CarouselNext className="text-2xl font-bold h-full rounded"></CarouselNext>
            <CarouselContent>
              {shops.slice(0, 8).map((shop, index) => (
                <CarouselItem className="basis-1/3 pl-4 pr-4" key={index}>
                  <Link href={`/shop/${shop.id}`} key={index}>
                    <div className="relative">
                      {shop.bannerPicture ? (
                        <Image
                          src={shop.bannerPicture}
                          alt={shop.shopName}
                          width={0}
                          height={0}
                          style={{ width: "100%", height: "auto" }}
                          className="rounded"
                        />
                      ) : (
                        <Image
                          src={"/photos/default_banner.png"}
                          alt={shop.shopName}
                          width={0}
                          height={0}
                          style={{ width: "100%", height: "auto" }}
                          className="rounded"
                        />
                      )}
                    </div>
                    <div className="-translate-y-1/4">
                      {shop.logoPicture && (
                        <div className="flex justify-center">
                          <Image
                            src={shop.logoPicture}
                            alt={shop.shopName}
                            width={0}
                            height={0}
                            style={{ width: "30%", height: "auto" }}
                            className=" rounded-full"
                          />
                        </div>
                      )}
                    </div>
                    <div className="-translate-y-1/4">
                      <h2 className="text-xl font-bold">{shop.shopName}</h2>
                      <p className="text-sm line-clamp-2">{shop.description}</p>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-2xl font-bold bg-slate-50 h-1/3 rounded" />
            <CarouselNext className="text-2xl font-bold bg-slate-50 h-1/3 rounded" />
          </Carousel>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TrendingShops;
