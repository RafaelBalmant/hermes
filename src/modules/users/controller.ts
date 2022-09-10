import { UserFunctionalities } from "./functionalities";
import { Response, Request } from "express";
import { container } from "tsyringe";

export class UserController {
  async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email } = request.body;
      const userFunctionalities = container.resolve(UserFunctionalities);
      const user = await userFunctionalities.createUser({ email, name });
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
}
