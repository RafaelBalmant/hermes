import { UsersRepository } from "./repositories/UsersRepository";
import { UserFunctionalities } from "./functionalities";
import { UserController } from "./controller";

const userRepository = UsersRepository.getInstance();

const functionalities = new UserFunctionalities(userRepository);

const controller = new UserController(functionalities);

export { controller as userController };
