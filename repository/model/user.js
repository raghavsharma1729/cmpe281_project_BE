import mongoose, { Schema } from 'mongoose';

export const collectionName = 'users';

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ["Male", "Female"]
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true
        },
        dateOfBirth: {
            type: Date
        },
        identification: {
            type: String
        },
        contactNo: {
            type: String,
            unique: true,
        },
        admin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.model(collectionName, UserSchema);