import mongoose, { Schema } from 'mongoose';

export const collectionName = 'trip';

const TripSchema = new Schema(
    {
        triptitle: {
            type: String,
            required: true,
        },
        destination: {
            type: Array, // List of Strings
            required: true
        },
        fromdate: {
            type: Date
        },
        todate: {
            type: Date
        },
        cost: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
            lowercase: true
        },
        tripdetail: {
            type: Array, //  List of Strings,
            required: true,
        },
        image: {
            type: String,//need to find syntax
            unique: true,
        }
    },
    {
        timestamps: true
    }
);

export const TripModel = mongoose.model(collectionName, TripSchema);
