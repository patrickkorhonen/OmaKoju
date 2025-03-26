"use client";
import TrendingShops from "../components/shopAccordion";


export default function Home() {
  return (
    <main className="min-h-screen ">
      <section className="flex flex-col bg-gradient-to-br from-bgGreen to-[#44806a] h-96 w-full mb-8">
        <div className="flex flex-col gap-8 h-full cursor-default justify-center items-center">
          <h1 className="text-3xl sm:text-6xl font-bold text-white">Welcome to Omakoju.</h1>
          <p className="text-white text-sm flex sm:w-1/4 text-center font-semibold">Unleash your creativity and start selling with ease. Join our vibrant community of entrepreneurs and explore countless shops tailored just for you.</p>
        </div>
      </section>
      <div className="w-screen sm:w-2/3 flex flex-col place-self-center">
      <div className="flex flex-col w-full place-self-center mb-20">
        <TrendingShops />
      </div>
      </div>
    </main>
  );
}
