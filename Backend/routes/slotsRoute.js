import express from "express";
import { addSlot, getSlots } from "../controllers/SlotsControllers.js";

const slotRouters = express.Router();

slotRouters.post("/addSlot", addSlot);
slotRouters.get("/getSlots", getSlots);

export default slotRouters;
