import mongoose from "mongoose";
import { AppError } from "../utils/AppError.js";

/** Convert known and unknown failures to the shared API error envelope. */
export function errorMiddleware(error, _req, res, _next) {
  let statusCode = 500;
  let message = "Internal server error";
  let errors = [];

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errors = error.errors;
  } else if (error && error.code === 11000) {
    const field = Object.keys(error.keyPattern || error.keyValue || {})[0] || "email";
    statusCode = 409;
    message = "A user with this value already exists";
    errors = [{ field, message: `${field} is already in use` }];
  } else if (error instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "Invalid value";
    errors = [{ field: error.path, message: "Invalid value" }];
  } else if (error?.name === "JsonWebTokenError" || error?.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired token";
  } else {
    console.error(error);
  }

  const response = { success: false, message, errors };
  if (process.env.NODE_ENV !== "production" && error?.stack) {
    response.stack = error.stack;
  }
  return res.status(statusCode).json(response);
}
