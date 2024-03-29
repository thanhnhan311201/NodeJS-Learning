const path = require("path");
const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "view", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  console.log(req.body.title);
  res.redirect("/");
});

module.exports = router;
