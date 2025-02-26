import farmerModel from "../models/farmerModel.js";

const addFarmerData = async (req, res) => {
  try {
    const farmerData = new farmerModel({
      name: req.body.name,
      aadharNo: req.body.aadharNo,
      crop: req.body.crop,
      quantity: req.body.quantity,
      date: req.body.date,
      price: req.body.price,
      remark: req.body.remark,
    });

    await farmerData.save();
    res.json({ success: true, message: "Farmer data added successfully!" });
  } catch (error) {
    console.error("Error adding farmer data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add data",
      error: error.message,
    });
  }
};

const getFarmersData = async (req, res) => {
  try {
    const requisitions = await farmerModel.find();
    res.status(200).json({ success: true, data: requisitions });
  } catch (error) {
    console.error("Error fetching requisitions:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch requisitions." });
  }
};

export { addFarmerData, getFarmersData };
