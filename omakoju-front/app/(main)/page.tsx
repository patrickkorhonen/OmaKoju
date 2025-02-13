"use client";
import TrendingShops from "../components/shopAccordion";


export default function Home() {
  return (
    <main className="flex justify-center min-h-screen bg-[#e4d5b7]">
      <div className="w-2/3 flex flex-col">
      <button className="bg-black text-white w-max place-self-end px-4 py-2 my-2 font-bold text-xs">Set up your own shop</button>
      <div className="flex flex-col w-full place-self-center mb-20">
        <TrendingShops />
      </div>
      </div>
    </main>
  );
}
