import { ILogsRepository } from "./ILogsRepository";
import { ILog } from "../../../../interfaces/shared/logs";
import { Logs } from "../entitites/Logs";
import { Model } from "mongoose";

class LogsRepository implements ILogsRepository {
  private logsModel: Model<ILog>;

  constructor() {
    this.logsModel = Logs;
  }

  async newLog({ type, response, endpoint, request }: ILog): Promise<ILog> {
    return this.logsModel.create({ type, response, endpoint, request });
  }
}

export { LogsRepository };
