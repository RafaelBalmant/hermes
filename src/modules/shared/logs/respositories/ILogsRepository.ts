import { ILog } from "../../../../interfaces/shared/logs";

interface ILogsRepository {
  newLog({ type, response, endpoint, request }: ILog): Promise<ILog>;
}

export { ILogsRepository };
