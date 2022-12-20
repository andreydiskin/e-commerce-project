const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/", async (req, res) => {
  try {
    const userByEmail = await User.findOne({ email: req.body.email });

    if (userByEmail) {
      return res.status(400).json("Email already exists");
    }

    const userByUserName = await User.findOne({ username: req.body.username });

    if (userByUserName) {
      return res.status(400).json("Username already exists");
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
      phoneNumber: req.body.phoneNumber,
      secretAnswer: req.body.secretAnswer,
      secretQuestion: req.body.secretQuestion,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
