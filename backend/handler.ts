import express from 'express';
import connectDb from './src/startup/db';
import routeSetup from './src/startup/routes';

const app = express();
connectDb();
routeSetup(app);

export default app;
