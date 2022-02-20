import express from 'express';
const router = express.Router();
import {
  getAllParcels,
  addNewParcel,
  getParcelById,
  updateParcelById,
  deleteParcelById,
  getLastId,
} from '../controllers/ParcelControllers';

//METHOD: GET
//GET LAST TRUCK ID
router.get('/lastid', getLastId);

//METHOD: GET
//GET ALL PARCELS
router.get('/', getAllParcels);

//METHOD: POST
//ADD A NEW PARCEL
router.post('/', addNewParcel);

//METHOD: GET
//FETCH A GIVEN PARCEL
router.get('/:id', getParcelById);

//METHOD: GET
//UPTADE A GIVEN PARCEL
router.put('/:id', updateParcelById);

//METHOD: GET
//UPTADE A GIVEN PARCEL
router.delete('/:id', deleteParcelById);

export default router;
