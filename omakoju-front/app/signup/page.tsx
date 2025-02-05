"use client";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    //console.log(name, email, password);
    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col h-full bg-[#013220]">
      <p className="text-white items-start font-bold text-5xl p-4">OmaKoju</p>
      <div className="mt-40">
        <div className="bg-white h-max shadow-xl p-4 rounded-lg w-1/5 mx-auto font-semibold">
          <h1 className="text-center text-2xl font-bold mb-2">Sign up</h1>
          <p className="text-center text-sm mb-4 text-slate-400 ">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 underline underline-offset-2"
            >
              Log in
            </Link>
          </p>
          <div className="flex flex-col gap-1 font-normal">
            <label htmlFor="name"></label>
            <input
              className="w-full border text-sm rounded-lg py-2 px-3"
              id="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email"></label>
            <input
              className="w-full border text-sm rounded-lg py-2 px-3"
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password"></label>
            <input
              className="w-full border text-sm rounded-lg py-2 px-3"
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <a
              href="#"
              className="text-sm underline underline-offset-2 text-blue-500"
            >
              Forgot password?
            </a>
            <button
              className="w-full bg-[#B8860B] text-white rounded-full p-3 mt-4 font-bold text-sm"
              type="submit"
              onClick={() => handleSignup()}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
