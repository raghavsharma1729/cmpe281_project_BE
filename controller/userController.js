import http from "../common/enums/http";
import { wrapAsync } from "../common/utils/error/wrapAsync";
import logger from "../common/utils/logger";
import userService from "../services/userService";

const create = async (
    request,
    response
) => {
    const {
        firstName,
        lastName,
        gender,
        dateOfBirth,
        contactNo,
        email,
        password,
        identification
    } = request.body;
    const user = { firstName, lastName, gender, dateOfBirth: new Date(dateOfBirth), contactNo, email, password, identification };
    const createdUser = await userService.create(user);
    response.status(http.StatusCode.CREATED).json(createdUser);
};

const userController = wrapAsync({
    create
});

export default userController;

