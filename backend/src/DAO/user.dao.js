import { UserModel } from "../models/user.model.js";

/** Create and persist a user. */
export async function createUser(input) {
  return UserModel.create(input);
}

/** Find a user by normalized email. */
export async function findUserByEmail(email) {
  return UserModel.findOne({ email }).select("+password");
}

/** Find a user by id without private authentication fields. */
export async function findUserById(id) {
  return UserModel.findById(id);
}

/** Find a user by id including the persisted refresh token. */
export async function findUserByIdWithRefreshToken(id) {
  return UserModel.findById(id).select("+refreshToken");
}

/** Replace a user's persisted refresh token. */
export async function updateRefreshToken(id, refreshToken) {
  return UserModel.findByIdAndUpdate(id, { refreshToken }, { new: true });
}

/** Invalidate a user's persisted refresh token. */
export async function clearRefreshToken(id) {
  return UserModel.findByIdAndUpdate(id, { refreshToken: null }, { new: true });
}
