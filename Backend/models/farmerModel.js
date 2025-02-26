import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aadharNo: {
    type: String,
    required: true,
    unique: true,
  },
  crop: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true, 
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  remark: {
    type: String,
    required: true,
  },
});

const farmerModel = mongoose.models.farmers || mongoose.model("farmers", farmerSchema);

export default farmerModel;
