import {Router} from 'express';
import { conversationValidator } from '../validators/conversation.validator.js';
import { validate } from '../middleware/validate.middleware.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * @Post
 * @route /api/v1/conversations 
 * @description handle the user message req.body should contain the user message and conversation ID (coversationId is optional for new conversations)
 */

  router.post('/',requireAuth , conversationValidator, validate, )  

export default router;