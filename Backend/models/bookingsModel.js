import mongoose from "mongoose";

const bookingsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  slot: {
    type: String,
    required: true,
  },
  rationCardNumber: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
});

const bookingsModel =
  mongoose.models.bookings || mongoose.model("bookings", bookingsSchema);

export default bookingsModel;
