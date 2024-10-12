const router = require("express").Router();
const User = require("../models/userModel");
const userAuth = require("../functions/userAuth");
const userLoginAuth = require("../functions/userLoginAuth");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check for missing fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).send("Missing required fields");
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Authenticate the user
    const authResult = await userAuth(name, email, password, confirmPassword);

    if (!authResult || typeof authResult.status === "undefined") {
      return res.status(500).send("Unexpected error during authentication.");
    }

    // If authentication fails, return an error
    if (authResult.status !== 200) {
      return res.status(authResult.status).send(authResult.message);
    }

    // If authentication is successful, proceed
    const {
      name: authName,
      email: authEmail,
      password: authPassword,
    } = authResult.data || {};

    const newUser = new User({
      name: authName,
      email: authEmail,
      password: authPassword,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(400).json({ message: "Internal server error" });
    }

    return res.status(201).json({
      message: "User created successfully.",
      userId: savedUser._id,
      name: savedUser.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const authResult = await userLoginAuth(
        existingUser.email,
        existingUser.password,
        password
      );

      if (authResult.status !== 200)
        return res.status(authResult.status).json(authResult.message);

      const userToken = jwt.sign(
        {
          userToken: existingUser._id,
        },
        process.env.JWT_KEY
      );

      return res
        .cookie("userToken", userToken, {
          httpOnly: true,
        })
        .json({ userName: existingUser.name, userId: existingUser._id });
    } else {
      return res.status(400).send("User not found...");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Delete User
router.post("/delete", async (req, res) => {
  try {
    const { id: userId } = req.body;

    if (userId) {
      const result = await User.findByIdAndDelete(userId);

      if (!result) {
        return res.status(404).send("User Not Exists");
      }

      return res.status(200).json({ message: "User Deleted..." });
    } else {
      return res.status(400).send("No user ID provided");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).send("An error occurred while deleting the user.");
  }
});

// Update User
router.post("/update", async (req, res) => {
  try {
    const { id, updateData } = req.body; // Matching 'id' instead of 'userId'

    if (id && updateData) {
      const filteredData = await userAuth(
        updateData.name,
        updateData.email,
        updateData.password,
        updateData.confirmPassword
      );

      const result = await User.findByIdAndUpdate(id, filteredData.data, {
        new: true,
      });

      if (!result) return res.status(404).send("User Not Exists");

      return res
        .status(200)
        .json({ message: "User updated successfully", data: result });
    } else {
      return res.status(400).send("No user ID or update data provided");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/fetch", async (req, res) => {
  try {
    const userData = await User.find();
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.post("/logout", (req, res) => {
  res
    .cookie("userToken", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send("User Logged out");
});

router.get("/loggedIn", (req, res) => {
  try {
    const userToken = req.cookies.userToken;
    if (!userToken) return res.send(false);

    jwt.verify(userToken, process.env.JWT_KEY);

    res.send(true);
  } catch (error) {
    console.error(error);
    res.send(false);
  }
});

module.exports = router;
