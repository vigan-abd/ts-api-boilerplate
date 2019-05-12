import { AwilixContainer } from 'awilix';
import io from '@helpers/SocketAdapter';
import LoggerService from '@services/LoggerService';

const register = (container: AwilixContainer) => {
  const loggerService: LoggerService = container.resolve('loggerService');

  io.on('connect', socket => {
    (io as any).clientCount++;
    loggerService.log("info", `Client #${socket.id} connected, total connections: ${(io as any).clientCount}`, { tags: 'debug' });

    socket.on('disconnect', () => {
      (io as any).clientCount--;
      loggerService.log("info", `Client #${socket.id} disconnected, total connections: ${(io as any).clientCount}`, { tags: 'debug' });
    });
  });
}

export default register;