import * as fs from 'fs';
import * as https from 'https';
import config from '@config';
import * as socketIO from 'socket.io';

let srv: string | https.Server = config.SOCKET_PORT;

if (config.SOCKET_SECURE) {
  const privateKey = fs.readFileSync(`${__dirname}/../../config/certs/privkey.pem`, 'utf8');
  const certificate = fs.readFileSync(`${__dirname}/../../config/certs/fullchain.pem`, 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  srv = https.createServer(credentials).listen(config.SOCKET_PORT);
}

const io = socketIO(srv, {
  path: config.SOCKET_PATH
});

(io as any).clientCount = 0;

export default io;