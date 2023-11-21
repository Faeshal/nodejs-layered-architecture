require("pretty-error").start();
const { ErrorResponse } = require("../middleware/errorHandler");
const { verifyToken } = require("../utils/paseto");
const log = require("log4js").getLogger("middleware:auth");
log.level = "info";

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(new ErrorResponse("unauthorized, token is empty", 401));
    }

    // * Verify Paseto Token
    const decoded = await verifyToken(token);
    if (decoded.success == false) {
      return next(new ErrorResponse("unauthorized or expired token", 401));
    }

    req.user = decoded.data;
    next();
  } catch (err) {
    log.error(err);
    return res
      .status(401)
      .json({ success: false, message: "unauthorized or expired token" });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ success: false, message: "role not authorize" });
    }
    next();
  };
};
