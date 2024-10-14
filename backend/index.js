const express = require("express");
const cors = require("cors");
const dbConnection = require("./dbConnect");
const cookieParser = require("cookie-parser");
const path = require("path"); // Import the path module

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
dbConnection();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
~
app.use("/img", express.static(path.join(__dirname, "img"))); 

app.use("/user", require("./routers/userRouter"));
app.use("/admin", require("./routers/adminRouter"));
app.use("/parkingOwner", require("./routers/parkingOwnerRouter"));
app.use("/parkingSpace", require("./routers/parkingSpaceRouter"));
app.use("/contact", require("./routers/contactRouter"));
app.use("/bookParking", require("./routers/bookParkingRouter"));

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});
