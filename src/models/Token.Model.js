import {Schema, model} from 'mongoose';

const TokenSchema = Schema({
    user: String,
    token: String
})

TokenSchema.plugin(require('mongoose-beautiful-unique-validation'))

export const TokenModel = model('token', TokenSchema)