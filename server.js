"use strict";
require("dotenv").config();
require("pretty-error").start();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const hpp = require("hpp");
const helmet = require("helmet");
const log4js = require("log4js");
const paginate = require("express-paginate");
const dayjs = require("dayjs");
const { errorHandler } = require("./middleware/errorHandler");
const log = log4js.getLogger("entrypoint");
log.level = "info";

// * Security, Compression & Parser
app.use(helmet());
app.use(hpp());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Http Logger
morgan.token("time", (req) => {
  let user = "anonym";
  if (req.user) {
    if (req.user.name) {
      user = req.user.name || "anonym";
    }
  }
  const time = dayjs().format("h:mm:ss A") + " - " + user;
  return time;
});
app.use(morgan("morgan: [:time] :method :url - :status"));

// * Paginate
app.use(paginate.middleware(10, 30));

// * Route
app.use(require("./routes"));

// * Custom Error Handler
app.use(errorHandler);

// * Rolling Log
let layoutConfig = {
  type: "pattern",
  pattern: "%x{id}: [%x{info}] %p %c - %[%m%]",
  tokens: {
    id: () => {
      return Date.now();
    },
    info: (req) => {
      const info = dayjs().format("D/M/YYYY h:mm:ss A");
      return info;
    },
  },
};
log4js.configure({
  appenders: {
    app: {
      type: "dateFile",
      filename: "./logs/app.log",
      numBackups: 3,
      layout: layoutConfig,
      maxLogSize: 7000000, // byte == 3mb
    },
    console: {
      type: "console",
      layout: layoutConfig,
    },
  },
  categories: {
    default: { appenders: ["app", "console"], level: "debug" },
  },
});

// * Server Listen
app.listen(PORT, (err) => {
  if (err) {
    log.error(`Error : ${err}`);
    process.exit(1);
  }
  log.info(`Server is Running On Port : ${PORT}`);
});

module.exports = app;
