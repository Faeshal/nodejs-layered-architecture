require("pretty-error").start();
const asyncHandler = require("express-async-handler");
const analyticService = require("../services/analytic");
const log = require("log4js").getLogger("controllers:analytic");
log.level = "debug";

// * @route GET /api/v1/analytics
// @desc    get analaytics
// @access  public
exports.getAnalytics = asyncHandler(async (req, res, next) => {
  const data = await analyticService.getAnalytic();
  res.status(200).json({ success: true, data });
});
