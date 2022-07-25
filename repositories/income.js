const Income = require("../models").income;
const log = require("log4js").getLogger("repository:income");
log.level = "info";

exports.add = async (body) => {
  const data = await Income.create(body);
  return data;
};

exports.getAll = async (body) => {
  const data = await Income.findAll(body);
  return data;
};

exports.getById = async (id) => {
  const data = await Income.findOne({ where: { id } });
  return data;
};

exports.update = async (body, id) => {
  const data = await Income.update({ body }, { where: { id } });
  return data;
};

exports.delete = async (id) => {
  const data = await Income.destroy({ where: { id } });
  return data;
};
