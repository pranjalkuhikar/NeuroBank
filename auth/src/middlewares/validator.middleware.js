import { body, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((e) => ({ field: e.param, msg: e.msg })),
    });
  }
  next();
};

export const registerValidator = [
  body("fullName.firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is Required"),
  body("fullName.lastName")
    .trim()
    .notEmpty()
    .withMessage("Last Name is Required"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  handleValidationErrors,
];

export const loginValidator = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleValidationErrors,
];
