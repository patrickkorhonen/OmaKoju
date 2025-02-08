/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import refreshToken from "./app/api/refreshToken";

export const loginSession = async (data: any) => {
  const expires = new Date(Date.now() + 60 * 60 * 24 * 1000);
  const session = data.token;

  (await cookies()).set("session", session, { expires, httpOnly: true });
};

export const logoutSession = async () => {
  (await cookies()).set("session", "", { expires: new Date(0) });
};

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  return session;
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  try {
    const data = await refreshToken(session);
    await loginSession(data);
  } catch (error) {
    console.log(error);
  }
}
