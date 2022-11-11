import userRepository from "../repository/userRepository";

const create = async (user) => {
    const result = await userRepository.create(user);
    return result;
};

const userService = { create };

export default userService