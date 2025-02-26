import mongoose from "mongoose";

const requisitionSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  requisitionNumber: {
    type: String,
    required: true,
    unique: true,
  },
  timePeriodFrom: {
    type: Date,
    required: true,
  },
  timePeriodTo: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  rationType: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const requisitionModel =
  mongoose.models.requisition ||
  mongoose.model("requisition", requisitionSchema);

export default requisitionModel;
