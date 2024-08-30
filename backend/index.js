const express = require("express");
const cors = require("cors");
const dbConnection = require("./dbConnect");

const app = express();
const PORT = process.env.PORT || 5000;

dbConnection();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}/`);
});

app.use("/user", require("./routers/userRouter"));