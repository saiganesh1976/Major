import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    // rationCategory: req.body.rationCategory,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ sucess: true, message: "Food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const category = req.query.category;
    const query = category && category !== "All" ? { category } : {};
    const foods = await foodModel.find(query);
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching food items" });
  }
};

//remove food item
const removeFoodItem = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    //delete img
    fs.unlink(`uploads/${food.image}`, () => {});
    // delete from mongodb
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFoodItem };
