import { UsersRepository } from "./repositories/UsersRepository";
import { UserFunctionalities } from "./functionalities";
import { UserController } from "./controller";
import { User } from "./entities/User";

const userRepository = new UsersRepository();

const functionalities = new UserFunctionalities(userRepository);

const controller = new UserController(functionalities);

export { controller as userController };
