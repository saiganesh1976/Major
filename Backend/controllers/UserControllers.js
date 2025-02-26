import userModel from "../models/userModel.js";
import rationModel from "../models/rationModel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// logIn user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't Exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};


//register user
const registerUser = async (req, res) => {
  const { name, password, email,rationCardNo } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    // console.log(rationCardNo);
    if (!rationCardNo) {
      return res.json({ success: false, message: "Ration Card Number is required" });
    }

    const rationCardExists = await rationModel.findOne({ rationCardNo });
    if (!rationCardExists) {
      return res.json({ success: false, message: "Invalid Ration Card Number" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    //encrpt the user password
    const salt = await bcrypt.genSalt(10); //5-15
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      rationCardNo:rationCardNo,
      email: email,
      password: hashedpassword,
    });
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
