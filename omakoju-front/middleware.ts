import { NextRequest } from "next/server";
import  { updateSession } from "./lib";

export async function middleware(request: NextRequest) {
    console.log("Middleware updates session");
    return await updateSession(request);
}