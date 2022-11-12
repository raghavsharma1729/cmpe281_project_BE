import { TripModel } from "./model/trip";

const convertTripDocumentToObject = (document) =>
    document.toObject({
        getters: true,
        versionKey: false,
        transform: (doc, ret) => ({
            ...ret,
            userId: ret.userId && ret.userId.toString()
        })
    });


const create = async (trip) => {
    const result = await TripModel.create(trip);
    return result && convertTripDocumentToObject(result);
};

const getById = async (id) => {
    const result = await TripModel.findOne({ id });
    return result && convertTripDocumentToObject(result);
};


const tripRepository = { create, getById };

export default tripRepository;