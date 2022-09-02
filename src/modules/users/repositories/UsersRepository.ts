import { v4 as uuidV4 } from "uuid";

import { User } from "../entities/User";
import { IUsersRepository, ICreateUserDTO } from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email, admin }: ICreateUserDTO): User {
    const newUser = {
      id: uuidV4(),
      name,
      email,
      admin: admin || false,
      created_at: new Date(),
      updated_at: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  findById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const { id } = receivedUser;
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          admin: true,
        };
      }
      return user;
    });
    return this.users.find((user) => user.id === id);
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
