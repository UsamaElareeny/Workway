import express, { type Request, type Express, type Response } from "express";
import { env } from "./config/env";
const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(env.PORT, () => {
  console.log(`The server is up and running at PORT: ${env.PORT}`);
});
