"use client";
import { useEffect, useState } from "react";
import { getUser, logoutSession } from "@/lib";
import { User } from "@/interface";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

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
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="flex justify-center bg-[#e4d5b7]">
      <div className="w-2/3 grid grid-cols-3 py-5 h-20">
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
            <p className=" place-self-center">{user.name}</p>
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
