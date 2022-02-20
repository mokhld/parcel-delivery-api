"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastId = exports.deleteTruckById = exports.updateTruckById = exports.getTruckById = exports.addNewTruck = exports.getAllTrucks = void 0;
var connections_1 = __importDefault(require("../db/connections"));
//Get All Trucks Function
var getAllTrucks = function (req, res) {
    connections_1.default.query("SELECT * FROM trucks", function (err, data, fields) {
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
exports.getAllTrucks = getAllTrucks;
//Add a New Trucks Function
var addNewTruck = function (req, res) {
    var query = "INSERT INTO trucks(name) values(?)";
    var name = req.body.name;
    if (name === undefined) {
        return res.status(400).json({
            status: "error",
            message: "Name field is required!",
        });
    }
    connections_1.default.query(query, [name], function (err) {
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
exports.addNewTruck = addNewTruck;
//Get Given Truck Function
var getTruckById = function (req, res) {
    var id = req.params.id;
    var query = "SELECT * from trucks where id = ".concat(id);
    connections_1.default.query(query, function (err, data) {
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
        if ((data === null || data === void 0 ? void 0 : data.length) === 0) {
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
exports.getTruckById = getTruckById;
//Update Given Truck Function
var updateTruckById = function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    if (name === undefined) {
        return res.status(404).json({
            status: "error",
            message: "Name field is required!",
        });
    }
    var query = "UPDATE trucks SET name = '".concat(name, "' where id = ").concat(id);
    connections_1.default.query(query, function (err, data, fields) {
        if ((data === null || data === void 0 ? void 0 : data.affectedRows) === 0) {
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
exports.updateTruckById = updateTruckById;
//Update Given Truck Function
var deleteTruckById = function (req, res) {
    var id = req.params.id;
    var query = "DELETE FROM trucks where id = ".concat(id);
    connections_1.default.query(query, function (err, data) {
        if ((data === null || data === void 0 ? void 0 : data.affectedRows) === 0) {
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
exports.deleteTruckById = deleteTruckById;
//Get last id from Truck table
var getLastId = function (req, res) {
    var query = "SELECT id FROM trucks ORDER BY id DESC LIMIT 1;";
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
