import dotenv from 'dotenv';
import http from 'node:http';
import app from './handler';
import logger from './src/startup/logging';
import appConfig from './src/config';

dotenv.config();

const port = appConfig.app.PORT || 3000;

const server = http.createServer(app);

app.set('port', port);

const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const address = server.address();
  const type = typeof address === 'string' ? `pipe ${address}` : `port ${address?.port}`;
  logger.debug(`Listening on ${type}`);
};

server.listen(port);
server.on('listening', onListening);
server.on('error', onError);
