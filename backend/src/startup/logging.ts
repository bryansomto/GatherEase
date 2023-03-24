import * as Pino from 'pino';

require('express-async-errors');

const logger = (() => {
  process.on('unhandledRejection', (ex) => {});
  return Pino.pino();
})();

export default logger;
