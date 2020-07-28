import { Schema, model } from "mongoose";

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: 'Email already exist'
    },
    username:{
        type: String,
        required: true,
        unique: 'Username already exist'
    },
    password: {
        type: String,
        required: true,
    }
})

UserSchema.plugin(require('mongoose-beautiful-unique-validation'))
export const UserModel = model('user', UserSchema)