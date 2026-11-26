import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const handleMessage = asyncHandler(async (req, res) => {
    
    const {content, conversation: conversationId} = req.body;
    const user = req.user;

    if (!conversationId) {
         
    }

})
