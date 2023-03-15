import { Router } from "express";
import {
  registerModel,
  deleteModel,
} from "../controllers/platformModelsController";

const platformModelRouter = Router();

platformModelRouter.post("/", registerModel);
platformModelRouter.post("/deleteModel", deleteModel);

export default platformModelRouter;

