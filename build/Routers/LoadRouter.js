"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var LoadControllers_1 = require("../controllers/LoadControllers");
//METHOD: GET
//GET ALL LOADS
router.get('/', LoadControllers_1.getAllLoads);
//METHOD: POST
//ADD A NEW LOAD
router.post('/', LoadControllers_1.loadTruck);
//METHOD: GET
//FETCH A GIVEN LOAD
router.get('/:id', LoadControllers_1.getLoadedTruckById);
//METHOD: GET
//UNLOAD A GIVEN LOAD
router.put('/', LoadControllers_1.unloadParcelById);
exports.default = router;
