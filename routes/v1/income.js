const express = require("express");
const router = express.Router();
const incomeController = require("../../controllers/income");
const { body, param } = require("express-validator");

router.get("/incomes", incomeController.getIncomes);
router.post(
  "/incomes",
  [
    body("name", "name is required").not().isEmpty().trim(),
    body("value", "value is required & must be an integer")
      .not()
      .isEmpty()
      .isInt(),
  ],
  incomeController.addIncomes
);
router.get(
  "/incomes/:id",
  [param("id", "param must be integer").exists().isNumeric()],
  incomeController.getIncome
);
router.put(
  "/incomes/:id",
  [
    param("id", "param must be integer").exists().isNumeric(),
    body("name", "name is required").not().isEmpty().trim(),
    body("value", "value is required & must be an integer")
      .not()
      .isEmpty()
      .isInt(),
  ],
  incomeController.updateIncome
);
router.delete(
  "/incomes/:id",
  [param("id", "param must be integer").exists().isNumeric()],
  incomeController.deleteIncome
);

module.exports = router;
