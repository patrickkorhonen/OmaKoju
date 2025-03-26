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
      if (response && response.ok) {
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
      <AccordionItem value="trending" className="p-4 border-0">
        <AccordionTrigger className="rounded hover:no-underline">
        <h1 className="text-2xl font-semibold">🔥 Trending Shops</h1>
        </AccordionTrigger>
        <AccordionContent>
          <Carousel className="mx-12 ">
            <CarouselPrevious className="text-2xl font-bold h-full rounded"></CarouselPrevious>
            <CarouselNext className="text-2xl font-bold h-full rounded"></CarouselNext>
            <CarouselContent>
              {shops.slice(0, 8).map((shop, index) => (
                <CarouselItem className="lg:basis-1/2 xl:basis-1/3 flex" key={index}>
                  <div className="rounded shadow-lg mb-4 m-4 transform hover:scale-105 transition ">
                    <Link href={`/shop/${shop.id}`} key={index}>
                      <div className="relative ">
                        {shop.bannerPicture ? (
                          <Image
                            src={shop.bannerPicture}
                            alt={shop.shopName}
                            width={0}
                            height={0}
                            style={{ width: "100%", height: "auto" }}
                            className="rounded-t shadow-md"
                          />
                        ) : (
                          <Image
                            src={"/photos/default_banner.png"}
                            alt={shop.shopName}
                            width={0}
                            height={0}
                            style={{ width: "100%", height: "auto" }}
                            className="rounded-t shadow-md"
                          />
                        )}
                      </div>
                      <div className="-translate-y-3.5">
                        {shop.logoPicture && (
                          <div className="flex justify-center">
                            <Image
                              src={shop.logoPicture}
                              alt={shop.shopName}
                              width={0}
                              height={0}
                              style={{ width: "40%", height: "auto" }}
                              className="rounded-full shadow-md"
                            />
                          </div>
                        )}
                      </div>
                      <div className="mx-4 pb-4">
                        <h2 className="text-xl font-bold">{shop.shopName}</h2>
                        <p className="text-sm text-gray-600 h-16 line-clamp-3">
                          {shop.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="text-2xl font-bold bg-slate-50 h-1/3 rounded" />
            <CarouselNext className="text-2xl font-bold bg-slate-50 h-1/3 rounded" />
          </Carousel>
        </AccordionContent>
        <hr className="border"></hr>
      </AccordionItem>
    </Accordion>
  );
};

export default TrendingShops;
