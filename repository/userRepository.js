import { UserModel } from "./model/user.js";


const convertUserDocumentToObject = (document) =>
    document.toObject({
        getters: true,
        versionKey: false,
        transform: (doc, ret) => ({
            ...ret,
            userId: ret.userId && ret.userId.toString()
        })
    });

const create = async (user) => {
    const result = await UserModel.create(user);
    return result && convertUserDocumentToObject(result);
};

const findUserByEmailAndPassword = async (email, password) => {
    const result = await UserModel.findOne({ email, password });
    return result && convertUserDocumentToObject(result);
};

const findUserById = async (id) => {
    const result = await UserModel.findById(id);
    return result && convertUserDocumentToObject(result);
};


const userRepository = { create, findUserByEmailAndPassword, findUserById };

export default userRepository;