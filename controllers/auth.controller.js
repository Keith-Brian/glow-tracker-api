const User = require("../models/users.model.js");
const Otp = require("../models/otp.model.js");
const { generateOtp } = require("../utils/otpgenerator.utils.js");
const sendOtp = require("../service/sendOtp.service.js");



// dealing with otp functions here
const handleOtp = async (phone, purpose) => {
  // generate a 4-digit OTP
  const otpCode = generateOtp();
  // set expiration time for OTP (5 minutes from now)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
  // save OTP to the database
  try{
    const otpEntry = await Otp.create(
        { phone: phone, code: otpCode, purpose: purpose, expiresAt }
    );
    console.log('OTP saved successfully', otpEntry);
  }
  catch(error){
    console.log("Cannot save otp to database");
  }
  
  // send OTP via SMS
  sendOtp(phone, `Your OTP code is: ${otpCode}`);
};


// verify the sent OTP
const verifyOtp = async (req, res) => {
  const { phone, otp } = req.query;

  try {
    const otpEntry = await Otp.findOne({
      phone: phone,
      code: otp,
      purpose: "VERIFICATION",
    });

    if (!otpEntry || otpEntry.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Mark user as verified
    await User.findOneAndUpdate({ phone }, { isVerified: true });
    //delete the used OTP
    await Otp.deleteMany({ phone });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const  { phone } = req.body;

    const user = await User.create(req.body);
    res.status(201).json({
      message: "User created successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });

    // initiating OTP sending here for verification
    await handleOtp(phone, "VERIFICATION");
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// api-function to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "please provide email and password" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// find user by email address

const findUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// delete a user from the profile

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// update user profile

const updateUser = async (req, res) => {
  try {
    const { userEmail } = req.body;
    const user = await User.findOneAndUpdate(userEmail, req.body);

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// TODO: add password reset functionality with OTP verification

const forgotPassword = async (req, res) => {
  const { phone } = req.params;

  try{
    await handleOtp(phone, "RESET");
    res.status(200).json({ message: "OTP sent for password reset" });
  }
  catch(error){
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}



module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  findUserByEmail,
  deleteUser,
  updateUser,
  verifyOtp
};
