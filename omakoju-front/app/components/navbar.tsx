"use client";
import { useEffect, useState } from "react";
import { getUser, logoutSession } from "@/lib";
import { User } from "@/interface";
import Link from "next/link";

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
    <div className="h-20 flex justify-between bg-[#013220] p-5">
      <Link
        className="text-2xl place-self-center text-white font-bold"
        href="/"
      >
        Omakoju
      </Link>
      {user && (
        <input
          placeholder="Search for a shop or product"
          className="rounded-full w-1/4 bg-slate-50 outline-none px-4 focus:placeholder-transparent"
        >
        </input>
      )}
      {loading ? (
        <></>
      ) : user ? (
        <div className="flex gap-6 mx-10">
          <p className="text-white place-self-center">{user.name}</p>
          <button
            onClick={() => handleLogout()}
            className="bg-[#B8860B] text-white rounded px-2 font-bold"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex gap-6 mx-10">
          <Link
            href="/login"
            className="text-white place-self-center underline underline-offset-2"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="bg-[#B8860B] text-white rounded px-2 font-bold flex items-center"
          >
            <p>Sign up</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
