import {body} from 'express-validator';

export const conversationValidator = [
    body('content')
    .notEmpty().withMessage('Message content is required').bail()
    .isString().withMessage('Message content must be a string').bail()
    .custom((value) => {value.trim().length > 0}).withMessage('Message content cannot be empty or whitespace only'),    
    body('conversation')
    .optional({values: null})
    .isMongoId().withMessage('Conversation ID must be a valid MongoDB ObjectId')
]