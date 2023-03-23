import express, { Express } from "express";
import dotenv from "dotenv";
import "colors";
import cors from "cors";
import connectDB from "./config/db";
dotenv.config();

import administratorRouter from "./routes/administratorRoute";
import administratorAvaterRoute from "./routes/administratorAvaterRoute";
import platformModelRouter from "./routes/platformModelRoute";
import topicRouter from "./routes/topicRoute";
import appendixRoute from "./routes/appendixRoute";
import userRoutter from "./routes/userRoute";

connectDB();

const port: number = (process.env.PORT as unknown as number) || 5000;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));

app.use("/api/administrator", administratorRouter);
app.use("/api/administratorAvater", administratorAvaterRoute);
app.use("/api/platformModel", platformModelRouter);
app.use("/api/topic", topicRouter);
app.use("/api/appendix", appendixRoute);
app.use("/api/user", userRoutter);

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port}`.cyan.underline
  );
});
