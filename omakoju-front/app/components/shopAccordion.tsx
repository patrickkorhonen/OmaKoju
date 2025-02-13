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

const dummydata = [
  {
    name: "Tony's Tools",
    description: "A wide selection of tools and equipment. Everything you need for your next project.",
    image: "/photos/tools.jpg",
  },
  {
    name: "Tech Haven",
    description: "Latest gadgets and electronics",
    image: "/photos/tech.jpg",
  },
  {
    name: "Fashion Fiesta",
    description: "",
    image: "/photos/tools.jpg",
  },
  {
    name: "Book Nook",
    description: "A paradise for book lovers",
    image: "/photos/tools.jpg",
  },
  {
    name: "Green Thumb",
    description: "Plants and gardening supplies",
    image: "/photos/tools.jpg",
  },
  {
    name: "Pet Paradise",
    description: "Everything for your furry friends",
    image: "/photos/tools.jpg",
  },
  {
    name: "Gourmet Grocer",
    description: "High-quality groceries and gourmet foods",
    image: "/photos/tools.jpg",
  },
  {
    name: "Fitness Fanatic",
    description: "Gear and supplements for fitness enthusiasts",
    image: "/photos/tools.jpg",
  },
  {
    name: "Toy Town",
    description: "Toys and games for kids of all ages",
    image: "/photos/tools.jpg",
  },
  {
    name: "Artisan Crafts",
    description: "Handmade crafts and unique gifts",
    image: "/photos/tools.jpg",
  },
  {
    name: "Beauty Bliss",
    description: "Skincare and beauty products",
    image: "/photos/tools.jpg",
  },
  {
    name: "Home Essentials",
    description: "Everything you need for your home",
    image: "/photos/tools.jpg",
  },
  {
    name: "Outdoor Outfitters",
    description: "Gear and apparel for outdoor adventures",
    image: "/photos/tools.jpg",
  },
];

const TrendingShops = () => {
  return (
    <Accordion
      className="flex flex-col gap-20"
      defaultValue={["trending", "new", "favorites"]}
      type="multiple"
    >
      <AccordionItem value="trending" className="border-b-2 border-black">
        <AccordionTrigger className="text-2xl font-bold hover:no-underline">
          Trending Shops
        </AccordionTrigger>
        <AccordionContent>
          <Carousel className="mx-12 ">
            <CarouselPrevious className="text-2xl font-bold">
            </CarouselPrevious>
            <CarouselNext className="text-2xl font-bold"></CarouselNext>
            <CarouselContent>
              {dummydata.slice(0, 8).map((shop, index) => (
                <CarouselItem className="basis-1/4" key={index}>
                  <Image
                    src={shop.image}
                    alt={shop.name}
                    width={0}
                    height={0}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <div className="mt-2">
                    <h2 className="text-xl font-bold">{shop.name}</h2>
                    <p className="text-sm">{shop.description}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="new" className="border-b-2 border-black">
        <AccordionTrigger className="text-2xl font-bold hover:no-underline">
          Newest Shops
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-4 gap-6">
            {dummydata.slice(8, 16).map((shop, index) => (
              <div
                key={index}
                className="flex flex-col p-6 bg-gray-100 rounded"
              >
                <h2 className="text-xl font-bold">{shop.name}</h2>
                <p className="text-sm">{shop.description}</p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="favorites" className="border-b-2 border-black">
        <AccordionTrigger className="text-2xl font-bold hover:no-underline">
          Your favorites
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-4 gap-6">
            {dummydata.slice(8, 16).map((shop, index) => (
              <div
                key={index}
                className="flex flex-col p-6 bg-gray-100 rounded"
              >
                <h2 className="text-xl font-bold">{shop.name}</h2>
                <p className="text-sm">{shop.description}</p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default TrendingShops;
