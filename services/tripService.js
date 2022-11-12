import tripRepository from "../repository/tripRepository";

const create = async (trip) => {
    const result = await tripRepository.create(trip);
    return result;
};


const tripService = { create };

export default tripService