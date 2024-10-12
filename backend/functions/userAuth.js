const bcrypt = require("bcryptjs");

const userAuth = async (name, email, password) => {
  // Check if passwords match
  if (password !== confirmPassword) {
    return { status: 400, message: "Passwords do not match" };
  }

  // Validate the email format
  const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValidator.test(email)) {
    return { status: 400, message: "Invalid email address" };
  }

  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10); // Specify salt rounds
    const passwordHash = await bcrypt.hash(password, salt);

    // Return successful authentication result with hashed password
    return {
      status: 200,
      data: { name, email, password: passwordHash },
    };
  } catch (error) {
    // Log the error for debugging
    console.error('Error hashing password:', error);
    // Return error status if hashing fails
    return { status: 500, message: "Error hashing password" };
  }
};

module.exports = userAuth;
