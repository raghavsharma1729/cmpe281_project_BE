import userRepository from "../repository/userRepository";
import pkg from 'lodash';
import { AppError } from "../common/utils/error/AppError";
import { ERROR_CODE } from "../common/enums/errorCode";
import jwt from "../common/utils/jwt";

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
    return token;
}

const userService = { create, login };

export default userService