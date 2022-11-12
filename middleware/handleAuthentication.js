import pkg from 'lodash';
import { ERROR_CODE } from '../common/enums/errorCode';
import { AppError } from "../common/utils/error/AppError";
import jwt from "../common/utils/jwt";
const { isEmpty, get } = pkg;

const extractToken = (headers) => {
    const authHeader = get(headers, 'authorization', undefined);
    return authHeader && authHeader.split(' ')[1];
};

const handleAuthentication = async (request, response, next) => {
    const token = extractToken(request.headers);
    console.log({ token });
    if (isEmpty(token)) {
        next(new AppError(ERROR_CODE.UNAUTHORIZED));
    }
    try {
        const payload = await jwt.decodeJWT(token);
        if (isEmpty(payload.data)) {
            next(new AppError(ERROR_CODE.UNAUTHORIZED));
        }
        request.body.user = payload.data;
    }
    catch (e) {
        next(new AppError(ERROR_CODE.UNAUTHORIZED));
    }
    next();
}

export default handleAuthentication;