import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  password?: string;
  picture: string;
  isUploaded: boolean;
}

const userSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  picture: {
    type: String,
    required: true,
  },
  isUploaded: {
    type: Boolean,
  },
});

const User = models.User || model("User", userSchema);
export default User;
