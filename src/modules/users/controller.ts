import { UserFunctionalities } from "./functionalities";
import { Response, Request } from "express";
import { container } from "tsyringe";

export class UserController {
  async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;
      const userFunctionalities = container.resolve(UserFunctionalities);
      const user = await userFunctionalities.createUser({
        email,
        name,
        password,
      });
      return response.status(201).send(user);
    } catch (e) {
      return response.status(400).send({ error: String(e.message) });
    }
  }

  async findUserById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const userFunctionalities = container.resolve(UserFunctionalities);
      const user = await userFunctionalities.findUserById(id);
      return response.status(201).send(user);
    } catch (e) {
      return response.status(400).send({ error: String(e.message) });
    }
  }

  async listUsers(request: Request, response: Response) {
    try {
      const userFunctionalities = container.resolve(UserFunctionalities);
      const data = await userFunctionalities.listUsers();
      return response.status(201).send(data);
    } catch (e) {
      return response.status(400).send({ error: String(e.message) });
    }
  }

  async authUser(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const userFunctionalities = container.resolve(UserFunctionalities);
      const data = await userFunctionalities.authUser({ email, password });
      return response.status(201).send(data);
    } catch (e) {
      return response.status(400).send({ error: String(e.message) });
    }
  }
}
