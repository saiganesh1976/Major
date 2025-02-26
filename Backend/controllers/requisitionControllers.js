import requisitionModel from "../models/requisitionModel.js";

const addRequisition = async (req, res) => {
  try {
    const newRequisition = new requisitionModel(req.body);
    await newRequisition.save();
    res.status(201).json({ success: true, message: "Requisition submitted successfully!" });
  } catch (error) {
    console.error("Error saving requisition:", error);
    res.status(500).json({ success: false, message: "Failed to submit requisition. Please try again." });
  }
};


// Get all requisitions
const getAllRequisitions = async (req, res) => {
  try {
    const requisitions = await requisitionModel.find();
    res.status(200).json({ success: true, data: requisitions });
  } catch (error) {
    console.error("Error fetching requisitions:", error);
    res.status(500).json({ success: false, message: "Failed to fetch requisitions." });
  }
};


export {addRequisition,getAllRequisitions}