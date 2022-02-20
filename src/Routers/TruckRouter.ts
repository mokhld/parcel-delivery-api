import express from 'express';
const router = express.Router();
import {
  getAllTrucks,
  addNewTruck,
  getTruckById,
  updateTruckById,
  deleteTruckById,
  getLastId,
} from '../controllers/TruckControllers';

//METHOD: GET
//GET LAST TRUCK ID
router.get('/lastid', getLastId);

//METHOD: GET
//FETCH A GIVEN TRUCK
router.get('/:id', getTruckById);

//METHOD: GET
//GET ALL TRUCKS
router.get('/', getAllTrucks);

//METHOD: POST
//ADD A NEW TRUCK
router.post('/', addNewTruck);

//METHOD: GET
//UPTADE A GIVEN TRUCK
router.put('/:id', updateTruckById);

//METHOD: GET
//UPTADE A GIVEN TRUCK
router.delete('/:id', deleteTruckById);

export default router;
