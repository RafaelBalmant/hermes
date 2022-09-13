import { IUsersRepository, ICreateUserDTO } from "./IUsersRepository";
import { IUser } from "../../../interfaces/users";
import { User } from "../entities/User";
import { Model, ObjectId } from "mongoose";

class UsersRepository implements IUsersRepository {
  private userModel: Model<IUser>;

  constructor() {
    this.userModel = User;
  }

  async create({
    name,
    email,
    admin,
    password,
  }: ICreateUserDTO): Promise<IUser> {
    return this.userModel.create({
      name,
      admin,
      email,
      password,
    });
  }

  async findById(id: string): Promise<IUser> {
    return this.userModel.findById(id);
  }

  async findByEmail(
    email: string
  ): Promise<{ name: string; email: string; _id: ObjectId; password: string }> {
    return this.userModel.findOne(
      { email },
      { name: true, email: true, password: true }
    );
  }

  turnAdmin(receivedUser: IUser): any {}

  async list(): Promise<IUser[]> {
    return this.userModel.find({});
  }
}

export { UsersRepository };
