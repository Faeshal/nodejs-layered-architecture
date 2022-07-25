const incomeRepo = require("../repositories/income");
const log = require("log4js").getLogger("service:income");
log.level = "debug";

exports.add = async (body) => {
  log.info("body:", body);
  const data = await incomeRepo.add(body);
  return data;
};

exports.getAll = async (body) => {
  log.info("body:", body);
  let data = await incomeRepo.getAll(body);
  return data;
};

exports.getById = async (id) => {
  log.info("id:", id);
  const data = await incomeRepo.getById(id);
  return data;
};

exports.update = async (body, id) => {
  log.info("body:", body, "- id:", id);
  const data = await incomeRepo.update(body, id);
  return data;
};

exports.delete = async (id) => {
  log.info("id:", id);
  const data = await incomeRepo.delete(id);
  return data;
};
