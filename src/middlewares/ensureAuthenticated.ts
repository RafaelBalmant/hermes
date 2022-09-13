import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/users/repositories/UsersRepository";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    response.status(201).send({ message: "Token missing" });
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, process.env.secret_key) as {
      sub: string;
    };
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);
    if (!user) {
      response.status(201).send({ message: "User does not exists" });
    }
    next();
  } catch (e) {
    response.status(201).send({ message: "token invalid" });
  }
}
