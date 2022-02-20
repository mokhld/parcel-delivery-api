"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unloadParcelById = exports.getLoadedTruckById = exports.loadTruck = exports.getAllLoads = void 0;
var connections_1 = __importDefault(require("../db/connections"));
//Get All Loads Function
var getAllLoads = function (req, res) {
    var query = "select t.id truck_id, t.name truck_name, sum(p.weight) weight, count(l.parcel_id) parcel_count from loads l, parcels p, trucks t where l.parcel_id = p.id and l.truck_id = t.id group by l.truck_id";
    connections_1.default.query(query, function (err, data, fields) {
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
exports.getAllLoads = getAllLoads;
//Add a New Load Function
var loadTruck = function (req, res) {
    var _a = req.body, truck_id = _a.truck_id, parcel_id = _a.parcel_id;
    if (!truck_id || !parcel_id) {
        return res.status(400).json({
            status: "error",
            message: "TruckId and ParcelId fields are required!",
        });
    }
    var query = "INSERT INTO loads(truck_id, parcel_id, status) values (?,?, ?)";
    connections_1.default.query(query, [truck_id, parcel_id, 0], function (err) {
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
    });
};
exports.loadTruck = loadTruck;
//Get Loaded Truck Details by TruckID
var getLoadedTruckById = function (req, res) {
    var id = req.params.id;
    var query = "select t.id truck_id, t.name truck_name,p.name, p.weight, case when l.status = 0 then 'loaded' else 'unloaded' END as status from loads l, parcels p, trucks t where l.parcel_id = p.id and l.truck_id = t.id and l.truck_id = ?";
    connections_1.default.query(query, [id], function (err, data) {
        if ((data === null || data === void 0 ? void 0 : data.length) === 0) {
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
exports.getLoadedTruckById = getLoadedTruckById;
//Unload Parcel By ParcelID
var unloadParcelById = function (req, res) {
    var _a = req.body, parcel_id = _a.parcel_id, truck_id = _a.truck_id;
    if (!truck_id || !parcel_id) {
        return res.status(400).json({
            status: "error",
            message: "TruckId and ParcelId fields are required!",
        });
    }
    var query = "UPDATE loads SET status = 1 where parcel_id = ? and truck_id = ?";
    connections_1.default.query(query, [parcel_id, truck_id], function (err, data) {
        if ((data === null || data === void 0 ? void 0 : data.affectedRows) === 0) {
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
    });
};
exports.unloadParcelById = unloadParcelById;
