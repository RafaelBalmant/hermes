import { container } from "tsyringe";

import { IUsersRepository } from "../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "../modules/users/repositories/UsersRepository";
import { ILogsRepository } from "../modules/shared/logs/respositories/ILogsRepository";
import { LogsRepository } from "../modules/shared/logs/respositories/LogsRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ILogsRepository>("LogsRepository", LogsRepository);
