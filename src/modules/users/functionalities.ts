import { IUsersRepository } from "./repositories/IUsersRepository";
import { User } from "./entities/User";
import { IUser } from "../../interfaces/users";

export class UserFunctionalities {
  constructor(private usersRepository: IUsersRepository) {}

  async createUser({
    email,
    name,
  }: {
    email: string;
    name: string;
  }): Promise<IUser> {
    const user = this.usersRepository.findByEmail(email);
    if (!email || !name) {
      throw new Error("Email and name are mandatory fields");
    } else if (user) {
      throw new Error("User already exists");
    } else {
      return this.usersRepository.create({ email, name });
    }
  }
}
