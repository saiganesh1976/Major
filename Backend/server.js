import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import cartRouter from "./routes/cartRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config.js";
import orderRouter from "./routes/orderRoute.js";
import rationRouter from "./routes/rationRoute.js";
import bookingRouter from "./routes/bookingRoute.js"
import dealersRouter from "./routes/dealersRoute.js";
import emergencyRationRouter from "./routes/emergencyRationRoute.js";
import farmersRouter from "./routes/farmerRoute.js";
import requisitionRouter from "./routes/requisitionRoute.js";
import slotRouters from "./routes/slotsRoute.js";
import OTPRouter from "./routes/OTPRoute.js";

//app config
const app = express();
const port = 5000;

// middleware
app.use(express.json());
app.use(cors());

//DB connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads")); // mount the file  eq. http://localhost:5000/images/1738643734964food_16.png
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/ration",rationRouter)
app.use("/api/dealers", dealersRouter);
app.use("/api/farmers",farmersRouter)
app.use("/api/requisition",requisitionRouter)
app.use("/api/emergencyRation",emergencyRationRouter)
app.use("/api/slots", slotRouters);
app.use("/api/bookings", bookingRouter);
// app.use("/api/otp",OTPRouter)

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server started on https://localhost:${port}`);
});

// mongodb+srv://saiganesh1976:21311a1976_rsg@cluster0.vosja.mongodb.net/?
