import { Router } from "express";
import { createTopic } from "../controllers/topicController";

const topicRouter = Router();

topicRouter.post("/createTopic", createTopic);

export default topicRouter;
