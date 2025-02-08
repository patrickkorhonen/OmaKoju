"use client";
import Link from "next/link";
import { getSession, logoutSession } from "@/lib";
import { useState, useEffect } from "react";

export default function Home() {
  const [session, setSession] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const handleLogout = async () => {
    await logoutSession();
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const sessionFetch = await getSession();
      setSession(sessionFetch);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <main className="h-screen p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>OmaKoju</div>
          <div>{typeof session === "string" ? session : null}</div>
          {!session ? (
            <button className="p-4 text-white bg-black rounded-lg w-max">
              <Link href={"/login"}>Log in</Link>
            </button>
          ) : (
            <button
              onClick={() => handleLogout()}
              className="p-4 text-white bg-black rounded-lg w-max"
            >
              Log out
            </button>
          )}
        </div>
      )}
    </main>
  );
}
