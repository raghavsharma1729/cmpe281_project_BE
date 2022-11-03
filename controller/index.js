import { addUser, login } from '../repository/userRepository.js';
import jwt from '../jwtUtils/index.js';

const decodeToken = async (input) => {
    try {
        return await jwt.decodeJWT(input);
    } catch (e) {
        console.log(e);
        return null;
    }
};

export async function registerPerson(request, response) {
    try {
        const userId = await addUser(request.body);
        response.status(201).send(`Registration successfull: ${userId}`);
    }
    catch (err) {
        response.status(500).send(`Something went wrong`);
    }
}

export async function userLogin(request, response) {
    try {
        const user = await login(request.body);
        const userDetails = {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.lastname,
            admin: user.admin
        };
        console.log(userDetails);
        const token = jwt.signJWT(
            userDetails
        );
        response.status(200).send({ jwtToken: token, user: userDetails })
    }
    catch (e) {
        response.status(401).send({ message: "email or password was incorrect" })

    }
}


