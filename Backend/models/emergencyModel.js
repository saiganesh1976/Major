import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rationNo: {
      type: String,
      required: true,
      unique: true,
    },
    aadhaarNo: {
      type: String,
      required: true,
      unique: true,
      match: /^\d{12}$/, // Exactly 12 digits
    },
    address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const emergencyModel =
  mongoose.models.emergencyration || mongoose.model("emergencyration", emergencySchema);

export default emergencyModel;
