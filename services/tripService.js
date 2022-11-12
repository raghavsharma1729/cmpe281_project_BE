import tripRepository from "../repository/tripRepository";

const create = async (trip) => {
    const result = await tripRepository.create(trip);
    return result;
};

const getById = async (tripId) => {
    const result = await tripRepository.getById(tripId);
    return result;
};


const tripService = { create, getById };

export default tripService