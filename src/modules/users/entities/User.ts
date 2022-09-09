import { v4 as uuidV4 } from "uuid";
import mongoose from "mongoose";
import { usersSchema } from "../../../database/schemas/users";
import { IUser } from "../../../interfaces/users";

export const User = mongoose.model<IUser>("user", usersSchema);
