import { IUsersRepository } from "./repositories/IUsersRepository";
import { IUser } from "../../interfaces/users";
import { inject, injectable } from "tsyringe";
import { ILogsRepository } from "../shared/logs/respositories/ILogsRepository";

@injectable()
export class UserFunctionalities {
  constructor(
    @inject("LogsRepository")
    private logsRepository: ILogsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async createUser({
    email,
    name,
  }: {
    email: string;
    name: string;
  }): Promise<IUser> {
    const user = await this.usersRepository.findByEmail(email);
    if (!email || !name) {
      throw new Error("Email and name are mandatory fields");
    } else if (user) {
      throw new Error("User already exists");
    } else {
      const user = await this.usersRepository.create({ email, name });
      await this.logsRepository.newLog({
        service: "users",
        response: JSON.stringify(user),
        endpoint: "/users POST",
      });
      return user;
    }
  }

  async findUserById(id: string): Promise<IUser> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw Error("User not found");
    }
    return user;
  }
}
