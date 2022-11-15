import userRepository from "../repository/userRepository.js";
import pkg from 'lodash';
import { AppError } from "../common/utils/error/AppError.js";
import { ERROR_CODE } from "../common/enums/errorCode.js";
import jwt from "../common/utils/jwt/index.js";
import tripService from "./tripService.js";

const { isEmpty } = pkg;

const create = async (user) => {
    const result = await userRepository.create(user);
    return result;
};

const login = async (email, password) => {
    const user = await userRepository.findUserByEmailAndPassword(email, password);
    if (isEmpty(user)) {
        throw new AppError(ERROR_CODE.UNAUTHORIZED);
    }
    const token = jwt.signJWT(user);
    return { token, user };
}

const fetchProfile = async (user) => {
    const result = await userService.getById(user.id);
    return result;
};

const fetchTrips = async (user) => {
    const trips = await tripService.findTripsofUser(user);
    return trips;
}

const fetchJoinedTrips = async (user) => {
    const trips = await tripService.fetchJoinedTrips(user);
    return trips;
}

const getById = async (userId) => {
    const user = await userRepository.findUserById(userId);
    const tripsCreated = await fetchTrips(user);
    const tripsJoined = await fetchJoinedTrips(user);
    return { ...user, tripsCreated: tripsCreated.length, tripsJoined: tripsJoined.length };
};

const userService = { create, login, fetchProfile, getById, fetchTrips, fetchJoinedTrips };

export default userService