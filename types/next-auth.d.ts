import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string; // Add the role field
    };
  }

  interface User {
    role?: string; // Add the role field
  }

  interface JWT {
    role?: string; // Add the role field
  }
}
