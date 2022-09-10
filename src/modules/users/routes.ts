import { Router } from "express";
import { UserController } from "./controller";

const routes = Router();

const userController: UserController = new UserController();

routes.post("/", userController.createUser);

routes.get("/:id", userController.findUserById);

export { routes as userRoutes };
