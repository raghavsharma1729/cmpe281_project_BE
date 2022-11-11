import { AppError } from '../common/utils/error/AppError';
import { ERROR_CODE } from '../common/enums/errorCode';

export const handleRoutes = (
  request,
  response,
  next
) => {
  const error = new AppError(ERROR_CODE.NOT_FOUND);
  next(error);
};
