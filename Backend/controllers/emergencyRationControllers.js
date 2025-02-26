import emergencyModel from "../models/emergencyModel.js";

const addData = async (req, res) => {
  try {
    const { name, rationNo, aadhaarNo, address, message } = req.body;
    if (!name || !rationNo || !aadhaarNo || !address) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const emergencyRationData = new emergencyModel({
      name,
      rationNo,
      aadhaarNo,
      address,
      message,
    });

    await emergencyRationData.save();
    res
      .status(201)
      .json({ success: true, message: "Emergency ration request submitted successfully." });
  } catch (error) {
    console.error("Error adding emergencyRationData:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const getEmergencyRation = async (req, res) => {
  try {
    const requisitions = await emergencyModel.find();
    res.status(200).json({ success: true, data: requisitions });
  } catch (error) {
    console.error("Error fetching requisitions:", error);
    res.status(500).json({ success: false, message: "Failed to fetch requisitions." });
  }
};

export { addData,getEmergencyRation };
