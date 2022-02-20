"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var config_1 = require("../config/config");
var connection = mysql_1.default.createConnection(config_1.databaseOptions);
// open the MySQL connection
connection.connect(function (error) {
    if (error)
        throw error;
    console.log("Successfully connected to the database.");
});
exports.default = connection;
