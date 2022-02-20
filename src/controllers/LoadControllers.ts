import { Request, Response } from "express";
import connection from "../db/connections";

//Get All Loads Function
const getAllLoads = (req: Request, res: Response) => {
  const query =
    "select t.id truck_id, t.name truck_name, sum(p.weight) weight, count(l.parcel_id) parcel_count from loads l, parcels p, trucks t where l.parcel_id = p.id and l.truck_id = t.id  group by l.truck_id";
  connection.query(query, (err, data) => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: err.sqlMessage,
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  });
};

//Add a New Load Function
const loadTruck = (req: Request, res: Response) => {
  const { truck_id, parcel_id } = req.body || "";

  if (
    truck_id === undefined ||
    !truck_id ||
    parcel_id === undefined ||
    !parcel_id
  ) {
    return res.status(400).json({
      status: "error",
      message: "TruckId and ParcelId fields are required!",
    });
  }

  const query =
    "INSERT INTO loads(truck_id, parcel_id, status) values (?,?, ?)";

  connection.query(
    query,
    [parseInt(truck_id), parseInt(parcel_id), 0],
    (err) => {
      if (err) {
        res.status(500).json({
          status: "error",
          message: err.sqlMessage,
        });
        return;
      }
      res.status(201).json({
        status: "success",
        message: "Truck Loaded!",
      });
    }
  );
};

//Get Loaded Truck Details by TruckID
const getLoadedTruckById = (req: Request, res: Response) => {
  const { id } = req.params || "";
  if (id === undefined || !id) {
    return res.status(400).json({
      status: "error",
      message: "ID parameter is required",
    });
  }

  const query =
    "select t.id truck_id, t.name truck_name,p.name, p.weight, case when l.status = 0 then 'loaded' else 'unloaded' END as status from loads l, parcels p, trucks t where l.parcel_id = p.id and l.truck_id = t.id and l.truck_id = ?";

  connection.query(query, [parseInt(id)], (err, data) => {
    if (data?.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No Truck found",
      });
    }
    if (err) {
      if (err.code === "ER_BAD_FIELD_ERROR") {
        return res.status(404).json({
          status: "error",
          message: "No Truck Found",
        });
      }
      res.status(500).json({
        status: "error",
        message: err.sqlMessage,
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  });
};

//Unload Parcel By ParcelID
const unloadParcelById = (req: Request, res: Response) => {
  const { parcel_id, truck_id } = req.body || "";

  if (
    truck_id === undefined ||
    !truck_id ||
    parcel_id === undefined ||
    !parcel_id
  ) {
    return res.status(400).json({
      status: "error",
      message: "TruckId and ParcelId fields are required!",
    });
  }

  const query =
    "UPDATE loads SET status = 1 where parcel_id = ? and truck_id = ?";

  connection.query(
    query,
    [parseInt(parcel_id), parseInt(truck_id)],
    (err, data) => {
      if (data?.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Load could not be updated",
        });
      }
      if (err) {
        if (err.code === "ER_TRUNCATED_WRONG_VALUE") {
          return res.status(404).json({
            status: "error",
            message: "Please check the data types",
          });
        }
        if (err.code === "ER_BAD_FIELD_ERROR") {
          return res.status(404).json({
            status: "error",
            message: "No Truck Found",
          });
        }
        res.status(500).json({
          status: "error",
          message: err.sqlMessage,
        });
        return;
      }
      res.status(200).json({
        status: "success",
        message: "The Truck Unloaded By ParcelID!",
      });
    }
  );
};

export { getAllLoads, loadTruck, getLoadedTruckById, unloadParcelById };
