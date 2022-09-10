import { Schema } from "mongoose";
import { ILog } from "../../interfaces/shared/logs";

export const logsSchema = new Schema<ILog>(
  {
    endpoint: String,
    service: String,
    request: String,
    response: String,
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);
