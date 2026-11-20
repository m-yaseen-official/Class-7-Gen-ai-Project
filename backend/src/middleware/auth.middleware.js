import { findUserById } from "../DAO/user.dao.js";
import { AppError } from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/** Require a valid bearer access token and attach its user to the request. */
export const requireAuth = asyncHandler(async (req, _res, next) => {
  const authorization = req.get("authorization") || "";
  const [scheme, token] = authorization.split(" ");
  if (scheme !== "Bearer" || !token) {
    throw new AppError(401, "Authentication required");
  }
  const payload = verifyAccessToken(token);
  const user = await findUserById(payload.id);
  if (!user) throw new AppError(401, "Authentication required");
  req.user = user;
  next();
});
