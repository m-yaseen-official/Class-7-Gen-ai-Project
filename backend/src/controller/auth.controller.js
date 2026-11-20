import bcrypt from "bcryptjs";
import {
  clearRefreshToken,
  createUser,
  findUserByEmail,
  findUserById,
  findUserByIdWithRefreshToken,
  updateRefreshToken,
} from "../DAO/user.dao.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { sendSuccess } from "../utils/apiResponse.js";
import { createTokenPair, verifyRefreshToken } from "../utils/jwt.js";

const COOKIE_NAME = "downbot_refresh";
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/api/v1/auth",
};

function toPublicUser(user) {
  return { id: user._id.toString(), name: user.name, email: user.email };
}

function setRefreshCookie(res, refreshToken) {
  res.cookie(COOKIE_NAME, refreshToken, COOKIE_OPTIONS);
}

function clearRefreshCookie(res) {
  const { maxAge: _maxAge, ...options } = COOKIE_OPTIONS;
  res.clearCookie(COOKIE_NAME, options);
}

function invalidCredentials() {
  return new AppError(401, "Invalid credentials");
}

/** Register an account and issue a new access/refresh token pair. */
export const register = asyncHandler(async (req, res) => {
  const existingUser = await findUserByEmail(req.body.email);
  if (existingUser) throw new AppError(409, "A user with this email already exists", [
    { field: "email", message: "email is already in use" },
  ]);
  const user = await createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const tokens = createTokenPair(user);
  await updateRefreshToken(user._id, tokens.refreshToken);
  setRefreshCookie(res, tokens.refreshToken);
  return sendSuccess(res, 201, "Registration successful", {
    accessToken: tokens.accessToken,
    user: toPublicUser(user),
  });
});

/** Authenticate credentials and issue a new access/refresh token pair. */
export const login = asyncHandler(async (req, res) => {
  const user = await findUserByEmail(req.body.email);
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    throw invalidCredentials();
  }
  const tokens = createTokenPair(user);
  await updateRefreshToken(user._id, tokens.refreshToken);
  setRefreshCookie(res, tokens.refreshToken);
  return sendSuccess(res, 200, "Login successful", {
    accessToken: tokens.accessToken,
    user: toPublicUser(user),
  });
});

/** Validate and rotate the refresh token stored in the httpOnly cookie. */
export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies[COOKIE_NAME];
  if (!token) throw invalidCredentials();
  const payload = verifyRefreshToken(token);
  const user = await findUserByIdWithRefreshToken(payload.id);
  if (!user || user.refreshToken !== token) throw invalidCredentials();
  const tokens = createTokenPair(user);
  await updateRefreshToken(user._id, tokens.refreshToken);
  setRefreshCookie(res, tokens.refreshToken);
  return sendSuccess(res, 200, "Token refreshed", {
    accessToken: tokens.accessToken,
    user: toPublicUser(user),
  });
});

/** Invalidate the stored refresh token and clear its cookie. */
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies[COOKIE_NAME];
  if (token) {
    const payload = verifyRefreshToken(token);
    const user = await findUserByIdWithRefreshToken(payload.id);
    if (user && user.refreshToken === token) await clearRefreshToken(user._id);
  }
  clearRefreshCookie(res);
  return sendSuccess(res, 200, "Logout successful", {});
});

/** Return the currently authenticated user's public profile. */
export const me = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user._id);
  if (!user) throw new AppError(401, "Authentication required");
  return sendSuccess(res, 200, "User profile retrieved", { user: toPublicUser(user) });
});