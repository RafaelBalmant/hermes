import express from "express";
import { userRoutes } from "./modules/users/routes";

class App {
  public server;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    console.log("Server is Running!");
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use("/users", userRoutes);
  }
}

export default new App().server;
