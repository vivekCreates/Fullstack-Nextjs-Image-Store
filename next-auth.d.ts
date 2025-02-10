import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      username: string;
      email:string;
      role: string;
    };
  }

  interface jwt {
    id: string;
    role: string;
  }
}
