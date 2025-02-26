import express from "express";
import { addData,getEmergencyRation } from "../controllers/emergencyRationControllers.js";

const emergencyRationRouter = express.Router();

emergencyRationRouter.post("/addData", addData);
emergencyRationRouter.get("/getEmergencyRation", getEmergencyRation);

export default emergencyRationRouter;
