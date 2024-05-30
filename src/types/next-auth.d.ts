declare module "next-auth" {
  interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string | null;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
  }
}
