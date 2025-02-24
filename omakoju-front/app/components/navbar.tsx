"use client";
import { useEffect, useState } from "react";
import { getUser, logoutSession } from "@/lib";
import { User, Shop } from "@/interface";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { GETuserShops } from "../api/shop";

const Navbar = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);
  const [userShops, setUserShops] = useState<Shop[]>([]);

  const handleLogout = async () => {
    await logoutSession();
    await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const userFetch = await getUser();
      if (userFetch != undefined) {
        setUser(userFetch);
        const response = await GETuserShops();
        const data = await response.json();
        if (data) {
          setUserShops(data);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center bg-[#e4d5b7]">
      <div className="w-2/3 grid grid-cols-3 py-4 h-16">
        <Link className="text-2xl place-self-center w-full font-bold" href="/">
          <Image
            src={"/logo.png"}
            alt={"logo"}
            width={0}
            height={0}
            style={{ width: "40%", height: "auto" }}
          />
        </Link>
        {user ? (
          <input
            placeholder="Search for a shop or product"
            className="rounded-full w-full bg-slate-50 outline-none px-4 focus:placeholder-transparent"
          ></input>
        ) : (
          <div></div>
        )}
        {loading ? (
          <></>
        ) : user ? (
          <div className="flex gap-6 w-full justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none border-2 border-bgGreen text-bgGreen font-bold px-4 rounded-sm">
                {user.name}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="border" />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="hover:bg-slate-100 cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-100 cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-slate-100 cursor-pointer">
                    Orders
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="border" />
                <DropdownMenuItem className="hover:bg-red-500 hover:text-white cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {userShops.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none text-white bg-black font-bold px-4 rounded-sm">
                  Your shops
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  <DropdownMenuGroup>
                    {userShops.map((shop, index) => (
                      <Link key={index} href={`/shop/${shop.id}`}>
                      <DropdownMenuItem
                        className="hover:bg-slate-100 cursor-pointer"
                      >
                        {shop.shopName}
                      </DropdownMenuItem>
                      </Link>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <button
              onClick={() => handleLogout()}
              className="bg-[#013220] hover:bg-[#274d3f] text-white rounded-sm px-4 font-bold"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex gap-6 w-full justify-end">
            <Link
              href="/login"
              className="place-self-center underline underline-offset-2"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-[#013220] hover:bg-[#274d3f] text-white rounded-sm px-4 font-bold flex items-center"
            >
              <p>Sign up</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
