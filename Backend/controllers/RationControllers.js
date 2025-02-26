import RationCard from "../models/rationModel.js";

// Add a new ration card holder
const addRationCard = async (req, res) => {
  let familyPhotoFilename = req.file ? `${req.file.filename}` : null;
  const rationCard = new RationCard({
    rationCardNo: req.body.rationCardNo,
    aadhaarNo:req.body.aadhaarNo,
    cardType: req.body.cardType,
    applicationStatus: req.body.applicationStatus,
    applicationNo: req.body.applicationNo,
    officeName: req.body.officeName,
    fpShopNo: req.body.fpShopNo,
    headOfFamily: req.body.headOfFamily,
    district: req.body.district,
    gasConnection: req.body.gasConnection,
    consumerNo: req.body.consumerNo,
    members: JSON.parse(req.body.members),
    familyPhoto: familyPhotoFilename,
  });
  try {
    await rationCard.save();
    res.json({ success: true, message: "Ration Card added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding ration card" });
  }
};

// Get RationCard deatils based on the Card Number and District
const getRationCard = async (req, res) => {
  try {
    const { rationCardNo, district } = req.query;
    const query = {};
    if (rationCardNo) query.rationCardNo = rationCardNo;
    if (district) query.district = district;

    const rationCard = await RationCard.findOne(query);
    if (rationCard) {
      res.json({ success: true, user: rationCard });
    } else {
      res.json({ success: false, message: "Ration card not found" });
    }
  } catch (error) {
    console.error("Error fetching ration card:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching ration card" });
  }
};

// List all ration card holders
const listRationHolders = async (req, res) => {
  try {
    const rationHolders = await RationCard.find({});
    res.json({ success: true, users: rationHolders });
  } catch (error) {
    console.error("Error fetching ration holders:", error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching ration holders" });
  }
};

// Update a ration card holder
const updateRationCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedRationCard = await RationCard.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );

    if (updatedRationCard) {
      res.json({
        success: true,
        message: "Ration Card updated successfully",
        user: updatedRationCard,
      });
    } else {
      res.json({ success: false, message: "Ration card not found" });
    }
  } catch (error) {
    console.error("Error updating ration card:", error);
    res
      .status(500)
      .json({ success: false, message: "Error updating ration card" });
  }
};

// Delete a ration card holder
const deleteRationCard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRationCard = await RationCard.findByIdAndDelete(id);

    if (deletedRationCard) {
      res.json({ success: true, message: "Ration Card deleted successfully" });
    } else {
      res.json({ success: false, message: "Ration card not found" });
    }
  } catch (error) {
    console.error("Error deleting ration card:", error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting ration card" });
  }
};

export {
  addRationCard,
  getRationCard,
  listRationHolders,
  updateRationCard,
  deleteRationCard,
};
