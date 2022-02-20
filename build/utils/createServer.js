"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Routers_1 = require("../Routers");
function createServer() {
    var app = (0, express_1.default)();
    app.use(express_1.default.json());
    //Trucks Router
    app.use('/trucks', Routers_1.TruckRouter);
    //Parcel Router
    app.use('/parcels', Routers_1.ParcelRouter);
    //Load Router
    app.use('/loads', Routers_1.LoadRouter);
    return app;
}
exports.default = createServer;
