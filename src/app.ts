import express from "express";
import { userRoutes } from "./modules/users/routes";
import { Database } from "./database";
import * as dotenv from "dotenv";
dotenv.config();

class App {
  public server;

  constructor() {
    const dataBase = new Database(process.env.uri_database);
    this.server = express();
    this.middlewares();
    this.routes();
    dataBase.connectDatabase().then((res) => console.log(res));
    console.log("server running");
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use("/users", userRoutes);
  }
}

export default new App().server;
