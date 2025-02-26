import express from "express";
import { addRequisition, getAllRequisitions } from "../controllers/requisitionControllers.js";

const requisitionRouter = express.Router();

requisitionRouter.post("/addRequisition", addRequisition);
requisitionRouter.get("/getRequisition",getAllRequisitions)

export default requisitionRouter;
