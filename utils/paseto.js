const { V3 } = require("paseto");
const log = require("log4js").getLogger("utils:paseto");
log.level = "info";

const generateToken = async (payload) => {
  try {
    log.info("payload", payload);

    // generate secret key
    // const genSecret = await V3.generateKey("local", { format: "paserk" });
    // log.warn("secret key :", genSecret);

    // local paseto strategy
    const token = await V3.encrypt(payload, process.env.PASETO_SECRET_KEY, {
      expiresIn: "24h",
    });

    return {
      success: true,
      statusCode: 200,
      message: "ok",
      data: token,
    };
  } catch (err) {
    log.error(err);
    return {
      success: false,
      statusCode: 500,
      message: "generate token failed",
    };
  }
};

const verifyToken = async (token) => {
  try {
    const decoded = await V3.decrypt(token, process.env.PASETO_SECRET_KEY);
    log.warn("decoded:", decoded);
    return {
      success: true,
      statusCode: 200,
      message: "token valid",
      data: decoded,
    };
  } catch (err) {
    log.error(err);
    return {
      success: false,
      statusCode: 500,
      message: "invalid / expired token",
    };
  }
};

module.exports = { generateToken, verifyToken };
