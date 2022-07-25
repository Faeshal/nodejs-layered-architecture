const analyticRepo = require("../repositories/analytic");
const log = require("log4js").getLogger("service:analytic");
log.level = "debug";

exports.getAnalytic = async (body) => {
  log.info("body:", body);
  const data = await analyticRepo.getAnaytics;
  return data;
};
