import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
      <body className={`${inter.variable} antialiased flex flex-col`}>
        <div className="hidden sticky top-0 z-10 lg:block">
          <Navbar />
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
