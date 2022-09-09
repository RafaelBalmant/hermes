import { UserFunctionalities } from "./functionalities";
import { Response, Request } from "express";

export class UserController {
  constructor(private userFuncs: UserFunctionalities) {}
  async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email } = request.body;
      const user = await this.userFuncs.createUser({ email, name });
      return response.status(201).send(user);
    } catch (e) {
      return response.status(400).send({ error: String(e.message) });
    }
  }

  async findUserById(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const user = await this.userFuncs.findUserById(id);
      return response.status(201).send(user);
    } catch (e) {
      return response.status(400).send({ error: String(e.message) });
    }
  }
}
