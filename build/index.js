"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var Routers_1 = require("./Routers");
var express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
var dotenv_1 = __importDefault(require("dotenv"));
exports.app.use(express_1.default.json());
dotenv_1.default.config();
//Trucks Router
exports.app.use("/trucks", Routers_1.TruckRouter);
//Parcel Router
exports.app.use("/parcels", Routers_1.ParcelRouter);
//Load Router
exports.app.use("/loads", Routers_1.LoadRouter);
exports.app.use(function (req, res, next) {
    res.status(404).end("Endpoint does not exist!");
});
var port = process.env.PORT || 5000;
exports.app.listen(port, function () {
    console.log("Server is listening on port ".concat(port, "!"));
});
