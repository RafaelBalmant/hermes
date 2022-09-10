import { ILog } from "../../../../interfaces/shared/logs";

interface ILogsRepository {
  newLog({ service, response, endpoint, request }: ILog): Promise<ILog>;
}

export { ILogsRepository };
