import { IUsersRepository } from "./repositories/IUsersRepository";
import { User } from "./entities/User";

export class UserFunctionalities {
  constructor(private usersRepository: IUsersRepository) {}

  createUser({ email, name }: { email: string; name: string }): User {
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
