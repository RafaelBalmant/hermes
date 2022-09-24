import { IUsersRepository } from "./repositories/IUsersRepository";
import { IUser } from "../../interfaces/users";
import { inject, injectable } from "tsyringe";
import { ILogsRepository } from "../shared/logs/respositories/ILogsRepository";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { promises } from "dns";

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
    password,
  }: {
    email: string;
    name: string;
    password: string;
  }): Promise<IUser> {
    const user = await this.usersRepository.findByEmail(email);
    if (!email || !name || !password) {
      await this.logsRepository.newLog({
        type: "error",
        response: JSON.stringify(
          "Email, name and password are mandatory fields"
        ),
        request: JSON.stringify({ email, name }),
        endpoint: "/users POST",
      });

      throw new Error("Email, name and password are mandatory fields");
    } else if (user) {
      await this.logsRepository.newLog({
        type: "error",
        request: JSON.stringify({ email, name }),
        response: JSON.stringify("User already exists"),
        endpoint: "/users POST",
      });

      throw new Error("User already exists");
    } else {
      const passwordHash = await hash(password, 8);

      const user = await this.usersRepository.create({
        email,
        name,
        password: passwordHash,
      });

      await this.logsRepository.newLog({
        type: "success",
        request: JSON.stringify({ email, name }),
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

  async authUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ email: string; token: string }> {
    const user = await this.usersRepository.findByEmail(email);

    const passwordIsValid = user
      ? await compare(password, user.password)
      : false;

    const errorMessage = "email or password incorrect";

    if (!user || !passwordIsValid) {
      throw new Error(errorMessage);
    }

    const token = sign({ email: user.email }, process.env.secret_key, {
      subject: String(user._id),
      expiresIn: "1d",
    });

    return {
      email: user.email,
      token,
    };
  }
}
