import express from 'express';
import { TruckRouter, LoadRouter, ParcelRouter } from '../Routers';

function createServer() {
  const app = express();

  app.use(express.json());

  //Trucks Router
  app.use('/trucks', TruckRouter);

  //Parcel Router
  app.use('/parcels', ParcelRouter);

  //Load Router
  app.use('/loads', LoadRouter);

  return app;
}

export default createServer;
