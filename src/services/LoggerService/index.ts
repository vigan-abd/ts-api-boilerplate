import * as winston from 'winston';
const CloudWatchTransport: winston.TransportInstance = require('winston-aws-cloudwatch');
import config from '@config';

class LoggerService {
  protected logger: winston.LoggerInstance;
  protected stream: (options?: any) => NodeJS.ReadableStream;

  constructor() {
    const logger = new winston.Logger();

    logger.on('error', err => {
      console.log(err);
    });

    if (config.APP_ENV == 'development' || config.APP_ENV == 'staging') {
      logger.add(winston.transports.Console, { timestamp: true, colorize: true });
    }

    if (config.APP_ENV == 'staging' || config.APP_ENV == 'production') {
      logger.add(winston.transports.File, { filename: `${config.ROOT}/../app.log` });
    }

    if (config.APP_ENV == 'production') {
      const logConfig: winston.TransportOptions = {
        logGroupName: config.LOG_GROUP_NAME, // REQUIRED
        logStreamName: config.APP_ENV, // REQUIRED
        createLogGroup: false,
        createLogStream: true,
        awsConfig: {
          accessKeyId: config.CLOUDWATCH_ACCESS_KEY_ID,
          secretAccessKey: config.CLOUDWATCH_SECRET_ACCESS_KEY,
          region: config.CLOUDWATCH_REGION
        },
        formatLog: (item: any) => {
          return item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta);
        }
      };

      logger.add(CloudWatchTransport, logConfig);
    }

    logger.level = config.LOG_LEVEL;

    logger.stream({
      write: (message: any) => {
        logger.info(message);
      }
    });

    this.logger = logger;
    this.stream = logger.stream;
    this.log = this.log.bind(this);
  }

  log(type: string, message: any, tags: any) {
    const { logger } = this;
    logger.log(type, message, tags);
  }
};

export default LoggerService;