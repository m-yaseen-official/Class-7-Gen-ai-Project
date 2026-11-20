import { validationResult } from "express-validator";
import { AppError } from "../utils/AppError.js";

/** Reject requests that fail the preceding express-validator chains. */
export function validate(req, _res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  const errors = result.array().map((error) => ({
    field: error.path,
    message: error.msg,
  }));
  return next(new AppError(422, "Validation failed", errors));
}
