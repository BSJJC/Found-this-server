import { Router } from "express";
import {
  getModels,
  registerModel,
  deleteModel,
} from "../controllers/platformModelsController";

const platformModelRouter = Router();

platformModelRouter.get("/getModels", getModels);
platformModelRouter.post("/addModel", registerModel);
platformModelRouter.delete("/deleteModel", deleteModel);

export default platformModelRouter;
