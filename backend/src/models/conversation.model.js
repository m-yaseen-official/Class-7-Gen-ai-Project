import mongoose from 'mongoose';


const conversationSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },

    title:{
        type:String,
        required:true,
        trim:true,
        maxlength: 100,
        default: "New Conversation"
    },
    lastMessage:{
        type:Date,
        default:null
    },
},{ 
    timestamps:{createdAt: 'createdAt', updatedAt: 'lastUpdate'}
})

conversationSchema.index({user: 1, lastMessage: -1})

const coversationModel = mongoose.model('Conversation', conversationSchema);

export default coversationModel;