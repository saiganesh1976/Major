import mongoose from "mongoose";

const rationSchema = new mongoose.Schema({
  rationCardNo: { type: String, required: true, unique: true },
  aadhaarNo:{type:String,required:true,unique:true},
  cardType: { type: String, required: true },
  applicationStatus: { type: String, default: "Pending" },
  applicationNo: { type: String, required: true, unique: true },
  officeName: { type: String, required: true },
  fpShopNo: { type: String, required: true,unique:false},
  headOfFamily: { type: String, required: true },
  district: { type: String, required: true },
  gasConnection: { type: String, required: true },
  consumerNo: { type: String, required: true, unique: true },
  members: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
      gender: { type: String, required: true }, 
      relation: { type: String, required: true },
    },
  ],
  familyPhoto: { type: String },
});

const rationModel =
  mongoose.models.ration || mongoose.model("ration", rationSchema);

export default rationModel;
