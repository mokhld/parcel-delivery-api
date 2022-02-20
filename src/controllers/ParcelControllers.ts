import { Request, Response } from "express";
import connection from "../db/connections";

//Get All Parcels Function
const getAllParcels = (req: Request, res: Response) => {
  connection.query("SELECT * FROM parcels", (err, data) => {
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

//Add a New Parcel Function
const addNewParcel = (req: Request, res: Response) => {
  const { name, weight } = req.body || "";

  if (name === undefined || !name || weight === undefined || !weight) {
    return res.status(400).json({
      status: "error",
      message: "Name and Weight fields are required!",
    });
  }

  const query = "INSERT INTO parcels(name, weight) values(?, ?)";
  connection.query(query, [String(name), parseFloat(weight)], (err) => {
    if (err) {
      res.status(500).json({
        status: "error",
        message: err.sqlMessage,
      });
      return;
    }
    res.status(201).json({
      status: "success",
      message: "New Parcel Created!",
    });
  });
};

//Get Given Parcel Function
const getParcelById = (req: Request, res: Response) => {
  const { id } = req.params || "";
  if (id === undefined || !id) {
    return res.status(400).json({
      status: "error",
      message: "ID parameter is required",
    });
  }
  const query = `SELECT * from parcels where id = ${parseInt(id)}`;
  connection.query(query, (err, data) => {
    if (err) {
      if (err.code === "ER_BAD_FIELD_ERROR") {
        return res.status(404).json({
          status: "error",
          message: "No Parcel Found",
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
        message: "No parcel found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  });
};

//Update Given Parcel Function
const updateParcelById = (req: Request, res: Response) => {
  const { id } = req.params || "";
  const { name, weight } = req.body || "";
  if (id === undefined || !id) {
    return res.status(400).json({
      status: "error",
      message: "ID parameter is required!",
    });
  }
  if (name === undefined || !name || weight === undefined || !weight) {
    return res.status(400).json({
      status: "error",
      message: "Name and Weight fields are required!",
    });
  }

  //Check if given parcel exists or not
  const selectQuery = `SELECT * from parcels where id=${parseInt(id)}`;

  connection.query(selectQuery, (err, data) => {
    if (err) {
      if (err.code === "ER_BAD_FIELD_ERROR") {
        return res.status(404).json({
          status: "error",
          message: "No Parcel Found",
        });
      }
      res.status(500).json({
        status: "error",
        message: err.sqlMessage,
      });
    }

    if (!err && data.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No parcel found",
      });
    }
  });

  const query = `UPDATE parcels SET name = ?, weight = ? where id = ?`;
  connection.query(
    query,
    [String(name), parseFloat(weight), parseInt(id)],
    (err, data) => {
      if (data?.affectedRows === 0) {
        return res.status(404).json({
          status: "error",
          message: "Parcel could not be updated",
        });
      }
      if (err) {
        res.status(500).json({
          status: "error",
          message: err.sqlMessage,
        });
        return;
      } else {
        res.status(200).json({
          status: "success",
          message: "Parcel updated!",
        });
      }
    }
  );
};

//Update Given Parcel Function
const deleteParcelById = (req: Request, res: Response) => {
  const { id } = req.params || "";
  if (id === undefined || !id) {
    return res.status(400).json({
      status: "error",
      message: "ID parameter is required",
    });
  }
  const query = `DELETE FROM parcels where id = ${parseInt(id)}`;
  connection.query(query, (err, result) => {
    if (result?.affectedRows === 0) {
      return res.status(404).json({
        status: "error",
        message: "No Parcel found",
      });
    }
    if (err) {
      if (err.code === "ER_BAD_FIELD_ERROR") {
        return res.status(404).json({
          status: "error",
          message: "No Parcel Found",
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
      message: "Parcel deleted!",
    });
  });
};

//Get last id from Truck table
const getLastId = (req: Request, res: Response) => {
  const query = "SELECT id FROM parcels ORDER BY id DESC LIMIT 1;";
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
  getAllParcels,
  addNewParcel,
  getParcelById,
  updateParcelById,
  deleteParcelById,
  getLastId,
};
