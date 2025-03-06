import Image from "next/image";

type Product = {
  product: product;
};

interface product {
  id: string;
  shopId: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string[];
}

const dummy = {
  item: {
    id: "1",
    shopId: "fc4a64b1-3b99-4e45-b892-49578a3db00f",
    name: "Kamera",
    price: 109.99,
    stock: 52,
    imageUrl: ["/photos/taulu.jpg", "/photos/kamera.jpg"],
  },
};
export default async function Product({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const slug = (await params).productId;

  return (
    <div className="min-h-screen lg:my-8 p-4 xl:p-0">
      <div className="w-full h-full xl:w-2/3 grid grid-cols-2 gap-8 p-4 place-self-center">
        <div className="relative w-full">
          <Image
            src={dummy.item.imageUrl[1]}
            alt={"tuote"}
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
            className="rounded-xl"
          />
        </div>
        <div className="grid grid-cols-2">
        <div className="">
          <h1 className="text-3xl font-bold">{dummy.item.name}</h1>
          <div className="">
            <p className="text-2xl tracking-wide my-8">{dummy.item.price} €</p>
            <p className="">Stock: Last Piece</p>
            <button className="w-full bg-blue-500 text-white font-bold rounded p-2">
              Add to Cart
            </button>
          </div>
          </div>
          <></>
        </div>
      </div>
    </div>
  );
}
