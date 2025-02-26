import express from "express";
import { addDealers, listDealers,getRationCardHoldersByShopNumber } from "../controllers/DealersControllers.js";

const dealersRouter = express.Router();

dealersRouter.post("/addDealers", addDealers);
dealersRouter.get("/listDealers", listDealers);
dealersRouter.get("/rationCardHolders/:shopNumber", getRationCardHoldersByShopNumber);

export default dealersRouter;
