import express from "express";
import { addFarmerData,getFarmersData } from "../controllers/FarmersController.js";

const farmersRouter = express.Router();

farmersRouter.post("/addFarmersData", addFarmerData);
farmersRouter.get("/getFarmersData", getFarmersData);

export default farmersRouter;
