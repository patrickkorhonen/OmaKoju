/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";


export const logoutSession = async () => {
  (await cookies()).set("user", "", { expires: new Date(0) });
};

export async function setUser(data: any) {
  const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
  const session = JSON.stringify(data);

  (await cookies()).set("user", session, { expires, httpOnly: true });
}

export async function getUser() {
  const session = (await cookies()).get("user")?.value;
  console.log('session12431245325', session);
  const parsedSession = session ? JSON.parse(session) : null;
  return parsedSession;
}

export async function getSession() {
  const token = (await cookies()).get("refreshToken")?.value;
  console.log('token', token);
  return token;
}
