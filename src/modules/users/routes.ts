import { Router } from "express";
import { userController } from "./main";

const routes = Router();

routes.post("/", (req, res) => {
  userController.createUser(req, res);
});

export { routes as userRoutes };
