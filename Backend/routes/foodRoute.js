import express from "express";
import { addFood,listFood,removeFoodItem } from "../controllers/foodControllers.js";
import multer from "multer";

const foodRouter = express.Router();

//Image storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood); //endpoint
foodRouter.get("/list",listFood)    //endpoint
foodRouter.post("/remove",removeFoodItem) //endpoint



export default foodRouter;
