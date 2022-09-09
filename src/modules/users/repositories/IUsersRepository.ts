import { IUser } from "../../../interfaces/users";

interface ICreateUserDTO {
  name: string;
  email: string;
  admin?: boolean;
}

interface IUsersRepository {
  create({ name, email }: ICreateUserDTO): Promise<IUser>;
  findById(id: string): any;
  findByEmail(email: string): any;
  turnAdmin(user: IUser): any;
  list(): any;
}

export { IUsersRepository, ICreateUserDTO };
