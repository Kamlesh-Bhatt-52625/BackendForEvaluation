const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/userRouter");
const { connection } = require("./config/db");
const { BlogRouter } = require("./routes/blogRouter");
const { auth } = require("./middleWare/auth");

const app = express();
app.use(express.json());

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.use("/user", userRouter);
app.use("/blogs", auth, BlogRouter);

const PORT = process.env.PORT;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to the Database");
  } catch (error) {
    console.log("Can not connect to the Database");
  }
  console.log(`App is runnign at port ${PORT}`);
});
