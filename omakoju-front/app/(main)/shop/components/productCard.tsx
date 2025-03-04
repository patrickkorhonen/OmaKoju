"use client"
import Image from "next/image";

type Product = {
    product: product
}

interface product {
    id: string;
    shopId: string;
    name: string;
    price: number;
    stock: number;
    imageUrl: string[];
}

export default function ProductCard({
    product,
}: Product) {

    return (
        <div className="bg-gray-200 p-4"></div>
    )
}