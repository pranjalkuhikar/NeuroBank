import expressValidator from "express-validator";

export const registerValidator = [
  expressValidator
    .body("fullName.firstName")
    .notEmpty()
    .withMessage("First Name is Required"),
  expressValidator
    .body("fullName.lastName")
    .notEmpty()
    .withMessage("Last Name is Required"),
  expressValidator.body("email").isEmail().withMessage("Email is Required"),
  expressValidator
    .body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  expressValidator
    .body("role")
    .isIn(["user", "admin"])
    .withMessage("Role must be either user or admin"),
  expressValidator
    .body("isEmailVerify")
    .isBoolean()
    .withMessage("isEmailVerify must be a boolean"),
];

export const loginValidator = [
  expressValidator.body("email").isEmail().withMessage("Email is Required"),
  expressValidator
    .body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
