import mongoose from "mongoose";

const slotsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  slot: { type: String, required: true },
});

const SlotsModel =
  mongoose.models.slots || mongoose.model("slots", slotsSchema);

export default SlotsModel;
