import { Schema, model, SchemaTypes } from "mongoose";

const UserSchema = Schema({
    email: {
        type: String,
        required: 'Email is required',
        unique: 'Email already exist',
        trim: true,
        validate: [
            {
                validator: (v) => {
                    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(v);
                },
                message: 'Email is not valid'
            }
        ]
    },
    username: {
        type: String,
        required: 'Username is required',
        unique: 'Username already exist',
        trim: true
    },
    password: {
        type: String,
        required: 'Password is required',
        trim: true,
        validate:[
            {
                validator: (v) => (v?.trim()?.length > 6),
                message: 'Minimum 8 character needed'
            }
        ]
    },
}, {timestamps: true})

const ProfileSchema = Schema({
    user: {
        type: SchemaTypes.ObjectId,
        required: 'User id required',
        ref: 'user',
        unique: 'User has a profile'
    },
    first_name: {
        type: String,
        trim: true,
        maxLength: 60,
        default: ''
    },
    last_name: {
        type: String,
        trim: true,
        maxLength: 60,
        default: ''
    },
    bio: {
        type: String,
        trim: true,
        maxLength: 160,
        default: ''
    }
}, {timestamps: true});

UserSchema.plugin(require('mongoose-beautiful-unique-validation'));
export const UserModel = model('user', UserSchema);
export const ProfileModel = model('profile', ProfileSchema);