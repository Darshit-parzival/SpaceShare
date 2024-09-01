const router = require("express").Router();
const User = require("../models/userModel");
const userAuth = require("../functions/userAuth");
const userLoginAuth = require("../functions/userLoginAuth");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    if (
      req.body.name &&
      req.body.email &&
      req.body.password &&
      req.body.confirmPassword
    ) {
      const authResult = await userAuth(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.confirmPassword
      );
      const { name, email, password } = authResult.data;
      if (authResult.status !== 200)
        return res.status(authResult.status).send(authResult.message);

      const newUser = new User({
        name,
        email,
        password,
      });
      const savedUser = await newUser.save();
      // return res.status(201).json({
      //   message: "User Created...",
      //   userId: savedUser._id,
      //   name: savedUser.fullName,
      // });

      const userToken = jwt.sign(
        {
          userToken: savedUser._id,
        },
        process.env.JWT_KEY
      );

      res
        .cookie(`userToken`, userToken, {
          httpOnly: true,
        })
        .send();
    } else {
      return res.status(400).send("Missing required fields");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
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
        .send(existingUser.name);
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
    const { delete: userId } = req.body;

    if (userId) {
      const result = await User.findByIdAndDelete(userId);

      if (!result) {
        return res.status(404).send("User Not Exists");
      }

      return res.status(200).send("User Deleted...");
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
    const { userId, updateData } = req.body;

    if (userId && updateData) {
      const filteredData = await userAuth(
        updateData.name,
        updateData.email,
        updateData.password,
        updateData.confirmPassword
      );
      console.log(filteredData);
      const result = await User.findByIdAndUpdate(userId, filteredData.data, {
        new: true,
      });
      if (!result) return res.status(404).send("User Not Exists");

      return res.status(200).json(result);
    } else {
      return res.status(400).send("No user ID or update data provided");
    }
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
