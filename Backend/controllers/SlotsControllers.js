import SlotsModel from "../models/slotsModel.js";

// Add a new slot
const addSlot = async (req, res) => {
  try {
    const { date, slot } = req.body;

    if (!date || !slot) {
      return res.status(400).json({ message: "Date and slot are required" });
    }

    const newSlot = new SlotsModel({ date: new Date(date), slot });
    await newSlot.save();

    res.status(201).json({ message: "Slot added successfully", slot: newSlot });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch available slots
const getSlots = async (req, res) => {
  try {
    const slots = await SlotsModel.find();
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { addSlot, getSlots };
