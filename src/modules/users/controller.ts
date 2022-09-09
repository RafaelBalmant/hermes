import { UserFunctionalities } from "./functionalities";
import { Response, Request } from "express";

export class UserController {
  constructor(private createUserUseCase: UserFunctionalities) {}
  async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email } = request.body;
      const user = await this.createUserUseCase.createUser({ email, name });
      return response.status(201).send(user);
    } catch (e) {
      return response.status(400).send({ error: String(e.message) });
    }
  }
}
