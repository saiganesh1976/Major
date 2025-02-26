import mongoose from "mongoose";

const dealersSchema = new mongoose.Schema({
  officeState: { type: String, required: true },
  officeDistrict: { type: String, required: true },
  officeName: { type: String, required: true },
  shopNumber: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
});

const dealersModel = mongoose.models.dealers || mongoose.model("dealers", dealersSchema);

export default dealersModel;
