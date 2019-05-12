import * as cron from 'node-cron';
import { AwilixContainer } from 'awilix';
import LoggerService from '@services/LoggerService';

const register = (container: AwilixContainer) => {
  const loggerService: LoggerService = container.resolve('loggerService');

  cron.schedule('* * * * *', async () => {
    loggerService.log("info", `Ping from cron job`, { tags: 'debug' });
  });
}

export default register;