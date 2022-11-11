import { createLogger } from 'winston';
import loggerConfig from './config';

const logger = createLogger(loggerConfig);

export default logger;
