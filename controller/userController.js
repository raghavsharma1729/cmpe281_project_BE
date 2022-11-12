import http from "../common/enums/http";
import { wrapAsync } from "../common/utils/error/wrapAsync";
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

const login = async (request, response) => {
    const { email, password } = request.body;
    const token = await userService.login(email, password);
    response.status(http.StatusCode.OK).json(token);
};


const userController = wrapAsync({
    create,
    login
});

export default userController;

