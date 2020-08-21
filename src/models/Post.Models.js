import { model, Schema, SchemaTypes } from "mongoose";

const PostSchema = Schema({
    owner: {
        type: SchemaTypes.ObjectId,
        required: 'User is required',
        ref: 'user'
    },
    group: {
        type: SchemaTypes.ObjectId,
        required: 'Group is required',
        ref: 'group'
    },
    content: {
        type: String,
        trim: true,
    },
    media: String,
    comments: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'comment'
        }
    ]

}, {timestamps: true})


const CommentSchema = Schema({
    owner: {
        type: SchemaTypes.ObjectId,
        required: 'User is required',
        ref: 'user'
    },
    content: {
        type: String,
        trim: true,
    },
    replies: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'reply'
        }
    ]
})

const ReplySchecma = Schema({
    owner: {
        type: SchemaTypes.ObjectId,
        required: 'User is required',
        ref: 'user'
    },
    content: {
        type: String,
        trim: true,
    },
})

export const PostModel = model('post', PostSchema);
export const CommentModel = model('comment', CommentSchema);
export const ReplyModel = model('reply', ReplySchecma);