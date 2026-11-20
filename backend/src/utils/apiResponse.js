/** Send a successful response using the shared API envelope. */
export function sendSuccess(res, statusCode, message, data) {
  return res.status(statusCode).json({ success: true, message, data });
}
