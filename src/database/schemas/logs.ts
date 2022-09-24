import { Schema } from "mongoose";
import { ILog } from "../../interfaces/shared/logs";

export const logsSchema = new Schema<ILog>(
  {
    endpoint: String,
    request: String,
    response: String,
    type: String,
  },
  {
    timestamps: { createdAt: "created_at" },
  }
);
