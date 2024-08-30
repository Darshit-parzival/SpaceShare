const bcrypt = require("bcryptjs");

const userLoginAuth = async (email, storedPasswordHash, reqPassword) => {
  if (!email || !reqPassword)
    return { status: 400, message: "Please enter all required fields" };

  const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValidator.test(email))
    return { status: 400, message: "Invalid email address" };

  try {
    const isMatch = await bcrypt.compare(reqPassword, storedPasswordHash);
    if (isMatch) return { status: 200 };
    else return { status: 400, message: "Incorrect Password" };
  } catch (error) {
    return { status: 500, message: "Error Login" };
  }
};

module.exports = userLoginAuth;
