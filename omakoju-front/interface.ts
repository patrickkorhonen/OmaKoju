export type Role = "BUYER" | "SELLER";

export interface Session {
  token: string;
  userInfo: {
    id: string;
    name: string;
    email: string;
    role: Role;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}