import bookingsModel from "../models/bookingsModel.js";
import rationModel from "../models/rationModel.js";
import SlotsModel from "../models/slotsModel.js";

// Define distribution dates and slots on the backend
// const distributionDates = [
//   new Date(2025, 1, 10),
//   new Date(2025, 1, 12),
//   new Date(2025, 2, 10),
//   new Date(2025, 1, 15),
//   new Date(2025, 2, 15),
//   new Date(2025, 3, 15),
//   new Date(2025, 2, 12),
//   new Date(2025, 3, 10),
//   new Date(2025, 3, 12),
// ];

// const availableSlots = [
//   "9:00 AM - 10:00 AM",
//   "10:00 AM - 11:00 AM",
//   "11:00 AM - 12:00 PM"
// ];

// API to fetch distribution dates
const getDistributionDates = async (req, res) => {
  try {
    // res.status(200).json(distributionDates);
    const dates = await SlotsModel.find().distinct("date");
    res.status(200).json(dates);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// API to fetch available slots
const getAvailableSlots = async (req, res) => {
  try {
    // res.status(200).json(availableSlots);
    const slots = await SlotsModel.find().distinct("slot");
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Book a slot
const bookSlot = async (req, res) => {
  try {
    const { date, slot, rationCardNumber, mobileNumber } = req.body;

    if (!date || !slot || !rationCardNumber || !mobileNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isRationCardExists = await rationModel.findOne({
      rationCardNo: rationCardNumber,
    });

    if (!isRationCardExists) {
      return res
        .status(404)
        .json({
          message: "Invalid ration card number. Please enter a valid one.",
        });
    }

    const newBooking = new bookingsModel({
      date: new Date(date),
      slot,
      rationCardNumber,
      mobileNumber,
    });

    await newBooking.save();
    res
      .status(201)
      .json({
        message: `Slot is booked for ${rationCardNumber} successfully`,
        booking: newBooking,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await bookingsModel.find();
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export { getDistributionDates, getAvailableSlots, bookSlot, getBookings };
