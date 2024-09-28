const router = require("express").Router();
const Admin = require("../models/adminModel");
const userAuth = require("../functions/userAuth");
const userLoginAuth = require("../functions/userLoginAuth");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).send("Missing required fields");
    }

    const authResult = await userAuth(name, email, password, confirmPassword);

    if (!authResult || typeof authResult.status === "undefined") {
      return res.status(500).send("Unexpected error during authentication.");
    }

    if (authResult.status !== 200) {
      return res.status(authResult.status).send(authResult.message);
    }

    const {
      name: authName,
      email: authEmail,
      password: authPassword,
    } = authResult.data || {};

    const newAdmin = new Admin({
      name: authName,
      email: authEmail,
      password: authPassword,
    });

    const savedAdmin = await newAdmin.save();

    return res.status(201).json({
      message: "Admin created successfully.",
      userId: savedAdmin._id,
      name: savedAdmin.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Admin.findOne({ email });

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
        .cookie("AdminToken", userToken, {
          httpOnly: true,
        })
        .send(existingUser.name);
    } else {
      return res.status(400).send("Admin not found...");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Delete User
router.post("/delete", async (req, res) => {
  try {
    const userId = req.body;

    if (userId) {
      const result = await Admin.findByIdAndDelete(userId.id);

      if (!result) {
        return res.status(404).json({ message: "Admin Not Exists" });
      }

      return res.status(200).json({ message: "Admin Deleted..." });
    } else {
      return res.status(400).json({ message: "No Admin ID provided" });
    }

  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "An error occurred while deleting the Admin." });
  }
});


// Update User
router.post("/update", async (req, res) => {
  try {
    const { userId, updateData } = req.body;

    if (userId && updateData) {
      const filteredData = await userAuth(
        updateData.name,
        updateData.email,
        updateData.password,
        updateData.confirmPassword
      );
      console.log(filteredData);
      const result = await Admin.findByIdAndUpdate(userId, filteredData.data, {
        new: true,
      });
      if (!result) return res.status(404).send("User Not Exists");

      return res.status(200).json(result);
    } else {
      return res.status(400).send("No user ID or update data provided");
    }
    pop;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.post("/logout", (req, res) => {
  res
    .cookie("AdminToken", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send("User Logged out");
});

module.exports = router;

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

router.post("/fetch", async (req, res) => {
  try {
    const adminData = await Admin.find();
    res.status(200).json(adminData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
