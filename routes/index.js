const express = require("express");
const router = express.Router();

router.use("/api/v1", require("./v1"));

router.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ success: true, message: "welcome to the Express API" });
});

module.exports = router;
