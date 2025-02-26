import express from "express";
import { getDistributionDates, getAvailableSlots, bookSlot, getBookings } from "../controllers/BookingControllers.js";

const bookingRouter = express.Router();

bookingRouter.get("/dates", getDistributionDates);
bookingRouter.get("/slots", getAvailableSlots);
bookingRouter.post("/book", bookSlot);
bookingRouter.get("/getBookings", getBookings);

export default bookingRouter;
