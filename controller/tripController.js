import http from "../common/enums/http";
import { wrapAsync } from "../common/utils/error/wrapAsync";
import logger from "../common/utils/logger";
import tripService from "../services/tripService";




const trips = async (request, response) => {
    const {
        title,
        destination,
        fromdate,
        todate,
        cost,
        image,
        tripdetail,
        useremail
    } = request.body;
    const trip = { title, destination, fromdate: new Date(fromdate), todate: new Date(todate), cost, useremail, tripdetail, image };
    const createTrip = await tripService.create(trip);
    response.status(http.StatusCode.CREATED).json(createTrip);
};

const tripController = wrapAsync({
    trips
});


export default tripController;