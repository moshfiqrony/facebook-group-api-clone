import { Schema, model } from "mongoose";

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
    }
})

UserSchema.plugin(require('mongoose-beautiful-unique-validation'))
export const UserModel = model('user', UserSchema)