import { body } from "express-validator";

/** Validate registration name, email, and password. */

export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required").bail()
    .isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
  body("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    .matches(/[A-Za-z]/).withMessage("Password must contain a letter")
    .matches(/[0-9]/).withMessage("Password must contain a number"),
];

/** Validate login credentials without revealing which credential failed. */
export const loginValidator = [
  body("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];
