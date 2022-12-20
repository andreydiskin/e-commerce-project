const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// step one get username send back secret question

router.post("/secretquestion", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) return res.status(401).json("Wrong User Name");

    const secretQuestion = user.secretQuestion;

    return res.status(200).json({ secretQuestion });
  } catch (err) {
    return res.status(500).json(err);
  }
});
// step two get answer and username send back token

router.post("/secretanswer", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) return res.status(401).json("Wrong User Name");

    const secretAnswer = user.secretAnswer;

    const inputAnswer = req.body.secretAnswer;

    if (secretAnswer != inputAnswer)
      return res.status(401).json("Wrong Answer");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//LOGIN

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.userName,
    });

    if (!user) return res.status(401).json("Wrong User Name");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword != inputPassword)
      return res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
