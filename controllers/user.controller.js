const User = require("../models/users.model.js");

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
    const user = await User.create(req.body);
    res
      .status(201)
      .json({
        message: "User created successfully",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// find user by email address

const findUserByEmail = async (req, res) =>{
    try{
        const user = User.findOne({email: req.body.email}).select('-password');

        if(!user){
            return res.status(404).json({message: "User does not exist"});
        }

        res.status(200).json(user)
    }
    catch{
        res.status(500).json({message: "Server Error", error: error.message});
    }
} 