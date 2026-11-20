import { AppError } from "../utils/AppError.js";

/** Forward unmatched routes to the centralized error handler. */
export function notFound(_req, _res, next) {
  next(new AppError(404, "Route not found"));
}
