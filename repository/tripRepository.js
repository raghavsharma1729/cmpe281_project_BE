import pkg from "lodash";
import { TripModel } from "./model/trip";
import { ObjectId } from 'mongodb';


const { isEmpty, isUndefined, omitBy } = pkg;

const convertTripDocumentToObject = (document) =>
    document.toObject({
        getters: true,
        versionKey: false,
        transform: (doc, ret) => ({
            ...ret,
            userId: ret.userId && ret.userId.toString()
        })
    });

const convertTripsToArray = (documents) =>
    documents.map(convertTripDocumentToObject);

const create = async (trip) => {
    const result = await TripModel.create(trip);
    return result && convertTripDocumentToObject(result);
};

const getById = async (id) => {
    const result = await TripModel.findOne({ id });
    return result && convertTripDocumentToObject(result);
};

const arrayRegex = (arr) => {
    return arr.map((value) => {
        return new RegExp(value, "i")
    })
}

const fetchFilterOptions = (filter) => {
    if (isEmpty(filter.places) && isEmpty(filter.startDate) && isEmpty(filter.endDate)) {
        return {};
    }
    else if (isEmpty(filter.places)) {
        return { fromDate: { $gte: filter.startDate, $lte: filter.endDate } };
    }
    else if (isEmpty(filter.startDate) && isEmpty(filter.endDate)) {
        const placesRegex = arrayRegex(filter.places);
        return { destinations: { $in: placesRegex } };
    }
    else {
        const placesRegex = arrayRegex(filter.places);
        return {
            $and: [
                { destinations: { $in: placesRegex } },
                { fromDate: { $gte: new Date(filter.startDate), $lte: new Date(filter.endDate) } }
            ]
        }
    }

};

const filter = async (filters) => {
    const filterOption = fetchFilterOptions(filters);
    console.log(filterOption);
    const result = await TripModel.find(filterOption);
    return result && convertTripsToArray(result);
}

const update = async (trip) => {
    const result = await TripModel.findOneAndUpdate(
        {
            _id: new ObjectId(trip.id)
        },
        { $set: omitBy(trip, isUndefined) },
        {
            new: true,
            runValidators: true,
        }
    );

    return result && convertTripDocumentToObject(result);
}

const joinRequest = async (tripId, user) => {
    await TripModel.updateOne(
        {
            _id: new ObjectId(tripId)
        },
        { $addToSet: { joiners: new ObjectId(user.id) } }
    );
}

const findTripsofUser = async (userId) => {
    const trips = await TripModel.find({ userId: new ObjectId(userId) });
    return trips && convertTripsToArray(trips);
}

const tripRepository = { create, getById, filter, update, joinRequest, findTripsofUser };

export default tripRepository;