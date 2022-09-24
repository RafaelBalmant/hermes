import { IUser } from "../../../interfaces/users";
import { ObjectId } from "mongoose";

interface ICreateUserDTO {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<IUser>;
  findById(id: string): Promise<IUser>;
  findByEmail(
    email: string
  ): Promise<{ email: string; name: string; _id: ObjectId; password: string }>;
  turnAdmin(user: IUser): any;
  list(): any;
}

export { IUsersRepository, ICreateUserDTO };
