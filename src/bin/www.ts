/**
 * Module dependencies.
 */
require('module-alias/register');
import { _container as container, default as app } from '../app';
import config from '@config';
import LoggerService from '@services/LoggerService';


const loggerService: LoggerService = container.resolve('loggerService');

/**
 * Get port from environment and store in Express.
 */
app.set('port', config.PORT);

app.listen(config.PORT, config.HOST, (err: any) => {
  if (err) {
    loggerService.log('error', err, { tags: 'cron' });
  }
  loggerService.log('info', `[STARTUP] Server listening on ${config.HOST}:${config.PORT}`, { tags: 'startup,network' });
});