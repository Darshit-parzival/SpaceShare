const bcrypt = require("bcryptjs");

const userAuth = async (name, email, password, confirmPassword) => {
  if (password !== confirmPassword)
    return { status: 400, message: "Passwords do not match" };

  const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValidator.test(email))
    return { status: 400, message: "Invalid email address" };

  try {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return res.status(200).json({
      status: 200,
      data: { name, email, password: passwordHash },
    });
  } catch (error) {
    return { status: 500, message: "Error hashing password" };
  }
};

module.exports = userAuth;