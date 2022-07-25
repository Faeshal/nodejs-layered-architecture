const express = require('express');
const router = express.Router();

router.use("/", require("./income"));
router.use("/", require("./analytic"));

module.exports = router;
