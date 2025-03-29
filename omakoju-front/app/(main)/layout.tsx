import type { Metadata } from "next";
import { Newsreader, Lato } from "next/font/google";
import "../globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { UserProvider } from "../context/context";
import { Toaster } from "@/components/ui/toaster";

// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });


const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"]
})

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Omakoju",
  description:
    "Centralized platform for online stores. Find the best shops and customers. Join us now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`${lato.className} ${newsreader.variable} antialiased min-h-screen flex flex-col`}>
          <div className="hidden sticky top-0 z-10 lg:block">
            <Navbar />
          </div>
          {children}
          <Toaster />
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
