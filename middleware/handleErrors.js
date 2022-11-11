import { AppError } from '../common/utils/error/AppError';
import logger from '../common/utils/logger';
import http from '../common/enums/http';
import { ERROR_CODE } from '../common/enums/errorCode';
import { ErrorList } from '../error';

export const handleErrors = (
  error,
  req,
  res,
  next
) => {
  logger.error(error.stack);
  if (error instanceof AppError) {
    return res.status(error.getErrors().statusCode).json(error.getErrors());
  }

  const defaultError = {
    statusCode: http.StatusCode.INTERNAL_SERVER_ERROR,
    message: ErrorList[ERROR_CODE.INTERNAL_SERVER_ERROR].message
  };
  return res.status(http.StatusCode.INTERNAL_SERVER_ERROR).json(defaultError);
};

