import { connectMongo } from '../common/db/mongoConnection';
export const handleDbConnection = async (
    request,
    response,
    next
) => {
    if (process.env.environment !== 'test') {
        await connectMongo();
    }
    next();
};
