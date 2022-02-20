"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastId = exports.deleteParcelById = exports.updateParcelById = exports.getParcelById = exports.addNewParcel = exports.getAllParcels = void 0;
var connections_1 = __importDefault(require("../db/connections"));
//Get All Parcels Function
var getAllParcels = function (req, res) {
    connections_1.default.query("SELECT * FROM parcels", function (err, data) {
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
exports.getAllParcels = getAllParcels;
//Add a New Parcel Function
var addNewParcel = function (req, res) {
    var _a = req.body || "", name = _a.name, weight = _a.weight;
    if (name === undefined || !name || weight === undefined || !weight) {
        return res.status(400).json({
            status: "error",
            message: "Name and Weight fields are required!",
        });
    }
    var query = "INSERT INTO parcels(name, weight) values(?, ?)";
    connections_1.default.query(query, [String(name), parseFloat(weight)], function (err) {
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
exports.addNewParcel = addNewParcel;
//Get Given Parcel Function
var getParcelById = function (req, res) {
    var id = (req.params || "").id;
    if (id === undefined || !id) {
        return res.status(400).json({
            status: "error",
            message: "ID parameter is required",
        });
    }
    var query = "SELECT * from parcels where id = ".concat(parseInt(id));
    connections_1.default.query(query, function (err, data) {
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
        if ((data === null || data === void 0 ? void 0 : data.length) === 0) {
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
exports.getParcelById = getParcelById;
//Update Given Parcel Function
var updateParcelById = function (req, res) {
    var id = (req.params || "").id;
    var _a = req.body || "", name = _a.name, weight = _a.weight;
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
    var selectQuery = "SELECT * from parcels where id=".concat(parseInt(id));
    connections_1.default.query(selectQuery, function (err, data) {
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
    var query = "UPDATE parcels SET name = ?, weight = ? where id = ?";
    connections_1.default.query(query, [String(name), parseFloat(weight), parseInt(id)], function (err, data) {
        if ((data === null || data === void 0 ? void 0 : data.affectedRows) === 0) {
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
        }
        else {
            res.status(200).json({
                status: "success",
                message: "Parcel updated!",
            });
        }
    });
};
exports.updateParcelById = updateParcelById;
//Update Given Parcel Function
var deleteParcelById = function (req, res) {
    var id = (req.params || "").id;
    if (id === undefined || !id) {
        return res.status(400).json({
            status: "error",
            message: "ID parameter is required",
        });
    }
    var query = "DELETE FROM parcels where id = ".concat(parseInt(id));
    connections_1.default.query(query, function (err, result) {
        if ((result === null || result === void 0 ? void 0 : result.affectedRows) === 0) {
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
exports.deleteParcelById = deleteParcelById;
//Get last id from Truck table
var getLastId = function (req, res) {
    var query = "SELECT id FROM parcels ORDER BY id DESC LIMIT 1;";
    connections_1.default.query(query, function (err, data) {
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
exports.getLastId = getLastId;
