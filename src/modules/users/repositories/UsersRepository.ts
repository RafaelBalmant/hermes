import { IUsersRepository, ICreateUserDTO } from "./IUsersRepository";
import { IUser } from "../../../interfaces/users";
import { User } from "../entities/User";
import { Model } from "mongoose";

class UsersRepository implements IUsersRepository {
  private userModel: Model<IUser>;

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.userModel = User;
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  async create({ name, email, admin }: ICreateUserDTO): Promise<IUser> {
    return this.userModel.create({
      name,
      admin,
      email,
    });
  }

  async findById(id: string): Promise<IUser> {
    return this.userModel.findById(id);
  }

  findByEmail(email: string): any {}

  turnAdmin(receivedUser: IUser): any {}

  list(): any {}
}

export { UsersRepository };
