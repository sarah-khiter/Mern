const User = require("../Models/userModels.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user", 
    });

    await user.save();
    res.status(201).send({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN } 
    );

    res.status(200).send({ message: "Login successful", token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
const getUsers = async (req, res) => {
    try {
      const users = await User.find({}, "username email role"); 
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ error: "Erreur lors de la récupération des utilisateurs." });
    }
  };

const updateUser = async (req, res) => {
  try {
    const updates = req.body;

   
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true, 
      runValidators: true, 
    });

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ message: "User updated successfully", user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
const getUserById = async (req, res) => {
    try {
      const { id } = req.params; 
      console.log(id);
  
      const user = await User.findById(id, "username email role"); 
      if (!user) {
        return res.status(404).send({ error: "Utilisateur non trouvé." });
      }
  
      res.status(200).send(user);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Erreur lors de la récupération de l'utilisateur." });
    }
  };

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.status(200).send({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, updateUser, deleteUser, getUsers ,getUserById};
