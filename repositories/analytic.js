const Income = require("../models").income;
const log = require("log4js").getLogger("repository:analytic");
log.level = "info";

exports.getAnaytics = async () => {
  let data = await Income.count();
  return data;
};
