import express, { Express, Request, Response } from "express";
import { routes } from "./routes/index.js";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/v1/", routes);

app.get("/", (req, res) => {
  res.send("Liveness");
});

export { app };
