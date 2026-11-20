import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

/** Create access and refresh JWTs for a user. */
export function createTokenPair(user) {
  const payload = { id: user._id.toString(), email: user.email };
  return {
    accessToken: jwt.sign(payload, config.accessTokenSecret, { expiresIn: "15m" }),
    refreshToken: jwt.sign(payload, config.refreshTokenSecret, { expiresIn: "7d" }),
  };
}

/** Verify and return an access-token payload. */
export function verifyAccessToken(token) {
  return jwt.verify(token, config.accessTokenSecret);
}

/** Verify and return a refresh-token payload. */
export function verifyRefreshToken(token) {
  return jwt.verify(token, config.refreshTokenSecret);
}
