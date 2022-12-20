const express = require("express");
const route = express.Router();
const { upload } = require("../storage/storage");
const { verifyTokenAndAdmin } = require("./verifyToken");

route.post("/item", verifyTokenAndAdmin, upload.single("image"), (req, res) => {
  res.status(200).send(req.fileName);
});

module.exports = route;
