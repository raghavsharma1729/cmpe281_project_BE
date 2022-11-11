import { UserModel } from "./model/user";


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

const userRepository = { create };

export default userRepository;