import * as mongoose from "mongoose";

export class Database {
  uri: string;
  constructor(stringConnection: string) {
    this.uri = stringConnection;
  }
  async connectDatabase() {
    try {
      await mongoose.connect(this.uri);
      return "connected in database";
    } catch (e) {
      return e.message;
    }
  }
}
