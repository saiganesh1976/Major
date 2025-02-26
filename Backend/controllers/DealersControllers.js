import dealersModel from "../models/dealersModel.js";
import rationModel from "../models/rationModel.js";

// Add a new dealer
const addDealers = async (req, res) => {
  try {
    const { officeState, officeDistrict, officeName, shopNumber, mobileNumber, } = req.body;
    const existingDealer = await dealersModel.findOne({ shopNumber });
    if (existingDealer) {
      return res.status(400).json({ message: "Dealer with this shop number already exists." });
    }
    const newDealer = new dealersModel({ officeState, officeDistrict, officeName, shopNumber, mobileNumber, });
    await newDealer.save();
    res.status(201).json({ message: "Dealer added successfully", dealer: newDealer });
  } catch (error) {
    console.error("Error adding dealer:", error);
    res.status(500).json({ message: "Error adding dealer", error });
  }
};

// List all dealers
const listDealers = async (req, res) => {
  try {
    const { officeState, officeDistrict, officeName } = req.query; // Get query params from the request

    const query = {};
    if (officeState) query.officeState = officeState;
    if (officeDistrict) query.officeDistrict = officeDistrict;
    if (officeName) query.officeName = officeName;

    const dealers = await dealersModel.find(query);
    res.status(200).json(dealers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dealers", error });
  }
};

// Fetch Ration Card Holders for a given Shop Number
const getRationCardHoldersByShopNumber = async (req, res) => {
  try {
    const { shopNumber } = req.params; 

    // Find all ration card holders under the given shop number
    const rationCardHolders = await rationModel.find({ fpShopNo: shopNumber });

    if (!rationCardHolders || rationCardHolders.length === 0) {
      return res
        .status(404)
        .json({
          message: "No ration card holders found for this shop number.",
        });
    }

    res.status(200).json(rationCardHolders);
  } catch (error) {
    console.error("Error fetching ration card holders:", error);
    res
      .status(500)
      .json({ message: "Error fetching ration card holders", error });
  }
};

export { addDealers, listDealers, getRationCardHoldersByShopNumber };
