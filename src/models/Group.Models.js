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

}, {timestamps: true})

const GroupMetaSchema = Schema({
    admins: [{
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: 'One admin is required'
    }],
    moderators: [{
        type: SchemaTypes.ObjectId,
        ref: 'user',
    }],
    group: {
        type: SchemaTypes.ObjectId,
        ref: 'group'
    }
})



GroupSchema.plugin(require('mongoose-beautiful-unique-validation'));
GroupMetaSchema.plugin(require('mongoose-beautiful-unique-validation'));

export const GroupModel = model('group', GroupSchema)
export const GroupMetaModel = model('group-meta', GroupMetaSchema)