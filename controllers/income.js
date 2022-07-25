require("pretty-error").start();
const asyncHandler = require("express-async-handler");
const incomeService = require("../services/income");
const { ErrorResponse } = require("../middleware/errorHandler");
const { validationResult } = require("express-validator");
const log = require("log4js").getLogger("controllers:income");
log.level = "debug";

// * @route GET /api/v1/incomes
// @desc    get incomes
// @access  public
exports.getIncomes = asyncHandler(async (req, res, next) => {
  const data = await incomeService.getAll({
    limit: req.query.limit,
    offset: req.skip,
    order: [["createdAt", "DESC"]],
    req,
  });
  res.status(200).json({
    success: true,
    totalData: data.data.count,
    totalPage: data.pagin.totalPage,
    currentPage: data.pagin.currentPage,
    nextPage: data.pagin.nextPage,
    data: data.data.rows || [],
  });
});

// * @route POST /api/v1/incomes
// @desc    add new incomes
// @access  public
exports.addIncomes = asyncHandler(async (req, res, next) => {
  log.info("body:", req.body);
  // * Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(errors.array({ onlyFirstError: true })[0].msg, 400)
    );
  }
  await incomeService.add(req.body);
  res.status(201).json({ success: true, message: "income create" });
});

// * @route GET /api/v1/incomes/:id
// @desc    get income by id
// @access  public
exports.getIncome = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // *Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(errors.array({ onlyFirstError: true })[0].msg, 400)
    );
  }
  const data = await incomeService.getById(id);
  res.status(200).json({ success: true, data: data || {} });
});

// * @route PUT /api/v1/incomes/:id
// @desc    update income by id
// @access  public
exports.updateIncome = asyncHandler(async (req, res, next) => {
  log.info("body:", req.body);
  const { id } = req.params;
  // *Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(errors.array({ onlyFirstError: true })[0].msg, 400)
    );
  }

  // * check valid id
  const isValid = await incomeService.getById(id);
  if (!isValid) {
    return next(new ErrorResponse("invalid id", 400));
  }

  // * call update service
  await incomeService.update(req.body, id);

  res.status(200).json({ success: true, message: "update success" });
});

// * @route DELETE /api/v1/incomes/:id
// @desc    delete income by id
// @access  public
exports.deleteIncome = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // *Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new ErrorResponse(errors.array({ onlyFirstError: true })[0].msg, 400)
    );
  }

  // * check valid id
  const isValid = await incomeService.getById(id);
  log.info("isvalid", isValid);
  if (!isValid) {
    return next(new ErrorResponse("invalid id", 400));
  }

  // * call delete service
  await incomeService.delete(id);

  res.status(200).json({ success: true, message: "delete success" });
});
