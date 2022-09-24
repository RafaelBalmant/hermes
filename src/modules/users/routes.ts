import { Router } from "express";
import { UserController } from "./controller";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const routes = Router();

const userController: UserController = new UserController();

routes.post("/", ensureAuthenticated, userController.createUser);

routes.get("/:id", ensureAuthenticated, userController.findUserById);

routes.post("/session", userController.authUser);

export { routes as userRoutes };
