const express = require("express");
const cors = require("cors");
const dbConnection = require("./dbConnect");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

dbConnection();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    
  })
);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});

app.use("/user", require("./routers/userRouter"));
app.use("/admin", require("./routers/adminRouter"));
