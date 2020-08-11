import {Schema, model, SchemaTypes} from 'mongoose';

const TokenSchema = Schema({
    user: {
        type: SchemaTypes.ObjectId,
        unique: 'User already exist',
        required: 'User',
        ref: 'user'
    },
    token: String
}, {timestamps: true})

TokenSchema.plugin(require('mongoose-beautiful-unique-validation'))

export const TokenModel = model('token', TokenSchema)