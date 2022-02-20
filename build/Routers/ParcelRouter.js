"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var ParcelControllers_1 = require("../controllers/ParcelControllers");
//METHOD: GET
//GET LAST TRUCK ID
router.get('/lastid', ParcelControllers_1.getLastId);
//METHOD: GET
//GET ALL PARCELS
router.get('/', ParcelControllers_1.getAllParcels);
//METHOD: POST
//ADD A NEW PARCEL
router.post('/', ParcelControllers_1.addNewParcel);
//METHOD: GET
//FETCH A GIVEN PARCEL
router.get('/:id', ParcelControllers_1.getParcelById);
//METHOD: GET
//UPTADE A GIVEN PARCEL
router.put('/:id', ParcelControllers_1.updateParcelById);
//METHOD: GET
//UPTADE A GIVEN PARCEL
router.delete('/:id', ParcelControllers_1.deleteParcelById);
exports.default = router;
