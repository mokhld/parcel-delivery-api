import express from 'express';
const router = express.Router();
import {
  getAllLoads,
  loadTruck,
  getLoadedTruckById,
  unloadParcelById,
} from '../controllers/LoadControllers';

//METHOD: GET
//GET ALL LOADS
router.get('/', getAllLoads);

//METHOD: POST
//ADD A NEW LOAD
router.post('/', loadTruck);

//METHOD: GET
//FETCH A GIVEN LOAD
router.get('/:id', getLoadedTruckById);

//METHOD: GET
//UNLOAD A GIVEN LOAD
router.put('/', unloadParcelById);

export default router;
