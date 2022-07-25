const express = require("express");
const router = express.Router();
const analyticController = require("../../controllers/analytic");

router.get("/analytics", analyticController.getAnalytics);

module.exports = router;
