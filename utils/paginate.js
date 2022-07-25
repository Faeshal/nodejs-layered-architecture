const pagination = require("express-paginate");
const log = require("log4js").getLogger("utils:paginate");
log.level = "info";

async function paginate(options) {
  try {
    const totalPage = Math.ceil(options.length / options.limit);
    let currentPage = parseInt(options.page) || 1;
    if (currentPage > totalPage) {
      currentPage = totalPage;
    }
    const nextPage = pagination.hasNextPages(options.req)(totalPage);
    return {
      totalPage,
      currentPage,
      nextPage,
    };
  } catch (err) {
    log.error(err);
    return;
  }
}

module.exports = { paginate };
