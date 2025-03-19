"use client";
import { useEffect, useState } from "react";
import { logoutSession } from "@/lib";
import { Shop } from "@/interface";
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
import { useUser } from "../context/context";

const Navbar = () => {
  const { user } = useUser();
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
      if (user != undefined) {
        const response = await GETuserShops();
        if (response && response.ok) {
          const data = await response.json();
          if (data) {
            setUserShops(data);
          }
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  return (
    <div className="flex justify-center shadow bg-bgBeige h-16 py-4">
      <div className="w-2/3 flex justify-between">
        <Link className="text-2xl place-self-center w-full font-bold" href="/">
          <Image
            src={"/logo.png"}
            alt={"logo"}
            width={0}
            height={0}
            style={{ width: "150px", height: "auto" }}
          />
        </Link>
        {user ? (
          <input
            placeholder="Search for a shop or product"
            className="rounded-full w-full text-sm mx-4 bg-slate-50 outline-none px-4 focus:placeholder-transparent"
          ></input>
        ) : (
          <></>
        )}
        {loading ? (
          <></>
        ) : user ? (
          <div className="flex gap-4 w-full justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none border-2 text-sm  border-bgGreen text-bgGreen font-bold px-4 rounded-sm">
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
              <Link
                className="rounded-sm bg-black text-white text-sm  font-bold px-4 flex items-center"
                href={"/dashboard"}
              >
                Dashboard
              </Link>
            )}

            <button
              onClick={() => handleLogout()}
              className="bg-[#013220] hover:bg-[#274d3f] text-white text-nowrap rounded-sm px-4 text-sm font-bold"
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex gap-4 w-full justify-end">
            <Link
              href="/login"
              className="place-self-center underline text-sm  underline-offset-2"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="bg-[#013220] hover:bg-[#274d3f] text-sm  text-white rounded-sm px-4 font-bold flex items-center"
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
