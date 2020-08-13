import {Schema, SchemaTypes, model} from 'mongoose';

const GroupSchema = Schema({
    name:{
        type: String,
        trim: true,
        required: 'Group name is required',
        maxlength: [25, 'Not more than 25 Characters']
    },
    description:{
        type: String,
        trim: true,
        maxlength: [120, 'Not more than 120 Characters']
    },
    type:{
        type: String,
        enum: ["PRIVATE", "PUBLIC", "CLOSED"],
        required: 'Group type is required',
    },
    user:{
        type: SchemaTypes.ObjectId,
        required: 'User is required',
        ref: 'user'
    },
    members:[{
        type: SchemaTypes.ObjectId,
        ref: 'user'
    }],
    admins:[{
        type: SchemaTypes.ObjectId,
        required: 'User is required',
        ref: 'user'
    }],
    moderators:[{
        type: SchemaTypes.ObjectId,
        ref: 'user'
    }]

}, {timestamps: true})



GroupSchema.plugin(require('mongoose-beautiful-unique-validation'));

export const GroupModel = model('group', GroupSchema)