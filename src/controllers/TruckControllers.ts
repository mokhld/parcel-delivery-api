import { Request, Response } from "express";
import connection from "../db/connections";

//Get All Trucks Function
const getAllTrucks = (req: Request, res: Response) => {
  connection.query("SELECT * FROM trucks", (err, data) => {
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

//Add a New Trucks Function
const addNewTruck = (req: Request, res: Response) => {
  const query = "INSERT INTO trucks(name) values(?)";
  const { name } = req.body || "";
  if (name === undefined || !name) {
    return res.status(400).json({
      status: "error",
      message: "Name field is required!",
    });
  }
  connection.query(query, [String(name)], (err) => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: err.sqlMessage,
      });
      return;
    }
    res.status(201).json({
      status: "success",
      message: "New Truck Added!",
    });
  });
};

//Get Given Truck Function
const getTruckById = (req: Request, res: Response) => {
  const { id } = req.params || "";
  if (id === undefined || !id) {
    return res.status(400).json({
      status: "error",
      message: "ID parameter is required",
    });
  }
  const query = `SELECT * from trucks where id = ${parseInt(id)}`;
  connection.query(query, (err, data) => {
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
    if (data?.length === 0) {
      res.status(404).json({
        status: "error",
        message: "No Truck Found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      data: data,
    });
  });
};

//Update Given Truck Function
const updateTruckById = (req: Request, res: Response) => {
  const { id } = req.params || "";
  const { name } = req.body || "";
  if (id === undefined || !id) {
    return res.status(400).json({
      status: "error",
      message: "ID parameter is required",
    });
  }
  if (name === undefined || !name) {
    return res.status(404).json({
      status: "error",
      message: "Name field is required!",
    });
  }

  const query = `UPDATE trucks SET name = ${String(name)} where id = ${parseInt(
    id
  )}`;
  connection.query(query, (err, data, fields) => {
    if (data?.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "No Truck Found",
      });
    }
    if (err) {
      if (err.code === "ER_BAD_FIELD_ERROR") {
        return res.status(404).json({
          status: "error",
          message: "No Truck Found",
        });
      }
      return res.status(500).json({
        status: "error",
        message: err.sqlMessage,
      });
    }
    res.status(200).json({
      status: "success",
      message: "Truck updated!",
    });
  });
};

//Update Given Truck Function
const deleteTruckById = (req: Request, res: Response) => {
  const { id } = req.params || "";
  if (id === undefined || !id) {
    return res.status(400).json({
      status: "error",
      message: "ID parameter is required",
    });
  }
  const query = `DELETE FROM trucks where id = ${parseInt(id)}`;
  connection.query(query, (err, data) => {
    if (data?.affectedRows === 0) {
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
      message: "Truck deleted!",
    });
  });
};

//Get last id from Truck table
const getLastId = (req: Request, res: Response) => {
  const query = "SELECT id FROM trucks ORDER BY id DESC LIMIT 1;";
  connection.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: err.sqlMessage,
      });
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  });
};

export {
  getAllTrucks,
  addNewTruck,
  getTruckById,
  updateTruckById,
  deleteTruckById,
  getLastId,
};
