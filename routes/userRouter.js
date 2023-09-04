const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");
require("dotenv").config();

const userRouter = Router();

userRouter.get("/", (req, res) => {
  try {
    res.send("userRouter is working");
  } catch (error) {
    res.send(error);
  }
});

userRouter.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  // console.log(name);
  // console.log(email);
  // console.log(password);

  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      res.send({ meaasage: "Please try again" });
    }
    const user = new UserModel({
      name,
      email,
      password: hash,
    });

    await user.save();
    // console.log(hash);
    res.send("Signup Successful");
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const isValid = await UserModel.findOne({ email });
  if (isValid) {
    const hash = isValid.password;
    // console.log(hash);
    bcrypt.compare(password, hash, function (err, response) {
      // res === true
      // console.log(response);

      if (response) {
        const token = jwt.sign(
          { userId: isValid._id },
          process.env.PRIVATE_KEY
        );
        // console.log(token);
        res.json({ message: "Login Successful", token });
      } else {
        res.json({ message: "Wrong Id or Password" });
      }
    });
  }
});

module.exports = { userRouter };
