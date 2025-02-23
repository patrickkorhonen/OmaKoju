"use client";
import TrendingShops from "../components/shopAccordion";


export default function Home() {
  return (
    <main className="min-h-screen ">
      <section className="flex flex-col bg-bgGreen h-80 w-full mb-8">
        <div className="flex flex-col gap-4 h-full cursor-default justify-center items-center">
          <h1 className="text-6xl font-bold text-white">Welcome to Omakoju</h1>
          <div className="text-white text-2xl flex font-semibold">The place to find the best&nbsp;<p className="text-bgBeige font-bold">shops</p>&nbsp;and&nbsp;<p className="text-bgBeige font-bold">customers</p></div>
        </div>
      </section>
      <div className="w-2/3 flex flex-col place-self-center">
      <div className="flex flex-col w-full place-self-center mb-20">
        <TrendingShops />
      </div>
      </div>
    </main>
  );
}
