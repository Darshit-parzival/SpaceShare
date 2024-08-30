const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const userToken = req.cookies.userToken;
    if (!userToken) return res.status(401).send("not login");

    const verification = jwt.verify(userToken, process.env.JWT_KEY);
    req.user = verification.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("not login");
  }
}

module.exports = auth;
