import pkg from "lodash";
import { TripModel } from "./model/trip";

const { isEmpty } = pkg;

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


const tripRepository = { create, getById, filter };

export default tripRepository;