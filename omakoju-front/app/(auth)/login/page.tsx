"use client";
import Link from "next/link";
import { useState } from "react";
import { setUser } from "../../../lib";
import { useRouter } from "next/navigation";
import { LogIn } from "@/app/api/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await LogIn(email, password);
      if (response) {
        const data = await response.json();
        if (response.ok) {
          await setUser(data.userInfo);
          router.push("/");
        } else if (response.status === 404 || response.status === 401) {
          setErrorMessage("Invalid email or password");
        } else {
          console.log("Login failed");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-full bg-[#013220]">
      <Link
        href={"/"}
        className="text-white items-start font-bold text-5xl p-4"
      >
        OmaKoju
      </Link>
      <div className="mt-40">
        <div className="bg-white h-max shadow-xl p-4 rounded-lg w-1/5 mx-auto font-semibold">
          <h1 className="text-center text-2xl font-bold mb-2">Log in</h1>
          <p className="text-center text-sm mb-4 text-slate-400 ">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/signup"
              className="text-blue-500 underline underline-offset-2"
            >
              Sign up
            </Link>
          </p>
          <div className="flex flex-col gap-1 font-normal">
            <label htmlFor="email"></label>
            <input
              className="w-full border text-sm rounded-lg py-2 px-3"
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
            />
            <label htmlFor="password"></label>
            <input
              className="w-full border text-sm rounded-lg py-2 px-3"
              id="password"
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
            />
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <a
              href="#"
              className="text-sm underline underline-offset-2 text-blue-500"
            >
              Forgot password?
            </a>
            <button
              className="w-full bg-[#B8860B] text-white rounded-full p-3 mt-4 font-bold text-sm"
              type="submit"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "LOG IN"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
