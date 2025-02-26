import express from "express";
import {addRationCard,getRationCard,listRationHolders,updateRationCard,deleteRationCard} from "../controllers/RationControllers.js";
import multer from "multer";

const rationRouter = express.Router();
                     
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

rationRouter.post("/addRation", upload.single("image"), addRationCard); 
rationRouter.get("/getRation", getRationCard);
rationRouter.get("/listRation", listRationHolders);
rationRouter.put("/updateRation/:id",updateRationCard);
rationRouter.delete("/deleteRation/:id",deleteRationCard)
export default rationRouter;
