import http from "../common/enums/http";
import { wrapAsync } from "../common/utils/error/wrapAsync";
import tripService from "../services/tripService";
import { ObjectId } from 'mongodb';


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

const tripController = wrapAsync({
    trips
});


export default tripController;