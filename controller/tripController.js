import http from "../common/enums/http";
import { wrapAsync } from "../common/utils/error/wrapAsync";
import tripService from "../services/tripService";
import { ObjectId } from 'mongodb';
import pkg from 'lodash';
const { isEmpty } = pkg;


const trips = async (request, response) => {
    const {
        title,
        destinations,
        fromDate,
        toDate,
        cost,
        images,
        members,
        tripDetails,
        user
    } = request.body;
    const trip = {
        title,
        destinations,
        fromDate: new Date(fromDate),
        toDate: new Date(toDate),
        cost,
        images,
        members,
        tripDetails,
        userId: user?.id || new ObjectId()
    };
    const createTrip = await tripService.create(trip);
    response.status(http.StatusCode.CREATED).json(createTrip);
};

const getById = async (request, response) => {
    const tripId = request.params.trip_id;
    const tripDetails = await tripService.getById(tripId);
    response.status(http.StatusCode.OK).json(tripDetails);
}

const findTrips = async (request, response) => {
    const { places, startDate, endDate } = request.query;
    console.log({ places, startDate, endDate });
    const filters = {
        places: Array.isArray(places) ? places : [places],
        startDate,
        endDate
    }
    const trips = await tripService.filter(filters);
    response.status(http.StatusCode.OK).json(trips);
}

const tripController = wrapAsync({
    trips,
    getById,
    findTrips
});


export default tripController;