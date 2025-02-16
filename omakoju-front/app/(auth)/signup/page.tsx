"use client";
import Link from "next/link";
import { useState } from "react";
import { setUser } from "../../../lib";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailAlreadyInUse, setEmailAlreadyInUse] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email) && !validatePassword(password)) {
      setErrorMessage(
        "Please enter a valid email address and password must be at least 6 characters long."
      );
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        await setUser(data.userInfo);
        router.push("/");
      } else if (response.status === 409) {
        console.log(response);
        console.log(response.status);
        setEmailAlreadyInUse(true);
      }
    } catch (error) {
      console.error(error);
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
              onChange={(e) => {
                setName(e.target.value);
                setErrorMessage("");
              }}
            />
            <label htmlFor="email"></label>
            <input
              className={`w-full border text-sm rounded-lg py-2 px-3 ${
                emailAlreadyInUse ? "border-red-500" : ""
              }`}
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailAlreadyInUse(false);
                setErrorMessage("");
              }}
            />
            {emailAlreadyInUse && (
              <p className="text-red-500 text-sm">Email is already in use</p>
            )}
            <label htmlFor="password"></label>
            <input
              className="w-full border text-sm rounded-lg py-2 px-3"
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value)
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
