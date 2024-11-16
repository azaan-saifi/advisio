import { IUser } from "@/lib/database/models/user.model";

export interface createUserProps {
  clerkId: string;
  name: string;
  email: string;
  password?: string;
  picture: string;
}
export interface updateUserProps {
  clerkId: string;
  updateData: Partial<IUser>;
}

export interface deleteUserProps {
  clerkId: string;
}
