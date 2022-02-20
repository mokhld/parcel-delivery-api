import { TruckRouter, LoadRouter, ParcelRouter } from "./Routers";
import express from "express";
export const app = express();
import dotenv from "dotenv";

app.use(express.json());

dotenv.config();

//Trucks Router
app.use("/trucks", TruckRouter);

//Parcel Router
app.use("/parcels", ParcelRouter);

//Load Router
app.use("/loads", LoadRouter);

app.use(function (req, res, next) {
  res.status(404).end("Endpoint does not exist!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
