"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var TruckControllers_1 = require("../controllers/TruckControllers");
//METHOD: GET
//GET LAST TRUCK ID
router.get('/lastid', TruckControllers_1.getLastId);
//METHOD: GET
//FETCH A GIVEN TRUCK
router.get('/:id', TruckControllers_1.getTruckById);
//METHOD: GET
//GET ALL TRUCKS
router.get('/', TruckControllers_1.getAllTrucks);
//METHOD: POST
//ADD A NEW TRUCK
router.post('/', TruckControllers_1.addNewTruck);
//METHOD: GET
//UPTADE A GIVEN TRUCK
router.put('/:id', TruckControllers_1.updateTruckById);
//METHOD: GET
//UPTADE A GIVEN TRUCK
router.delete('/:id', TruckControllers_1.deleteTruckById);
exports.default = router;
