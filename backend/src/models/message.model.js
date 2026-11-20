import mongoose from 'mongoose';

const MESSAGE_ROLES = Object.freeze(['user', 'assistant', 'tool']);

const messageSchema = new mongoose.Schema({
    role:{
        type:String,
        enum:[MESSAGE_ROLES],
        required:true
    },
    content:{
        type:String,
        required:true
    },
    conversation:{
        type:mongoose.Schema.type.ObjectId,
        ref: 'Conversation',
        required:true
    }
},{timestamps:{createdAt: 'createdAt', updatedAt: false}});

messageSchema.index({conversation: 1, createdAt: 1});

export const MessageModel = mongoose.model('Message', messageSchema);