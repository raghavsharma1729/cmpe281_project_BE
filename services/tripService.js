import tripRepository from "../repository/tripRepository";
import pkg from 'lodash';
import { AppError } from "../common/utils/error/AppError";
import { ERROR_CODE } from "../common/enums/errorCode";
import jwt from "../common/utils/jwt";


const { isEmpty } = pkg;

const create = async (trip) => {
    const result = await tripRepository.create(trip);
    return result;
};


const tripService = { create };

export default tripService