import mongoose from "mongoose";
import { logsSchema } from "../../../../database/schemas/logs";
import { ILog } from "../../../../interfaces/shared/logs";

export const Logs = mongoose.model<ILog>("logs", logsSchema);
