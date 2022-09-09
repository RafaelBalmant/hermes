import { Schema } from "mongoose";
import { IUser } from "../../interfaces/users";

export const usersSchema = new Schema<IUser>({
  name: String,
  admin: Boolean,
  email: String,
});
