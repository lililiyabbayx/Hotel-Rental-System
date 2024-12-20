import express from "express";
import Hotel from "../models/Hotel.js";
import { createHotel } from "../controllers/hotel.js";
import { updateHotel } from "../controllers/hotel.js";
import { getHotel } from "../controllers/hotel.js";
import { getHotels } from "../controllers/hotel.js";
import { deleteHotel } from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";
import { countByCity } from "../controllers/hotel.js";
import { countByType } from "../controllers/hotel.js";
const router = express.Router();
//create :
// localhost:5500/api/hotels
router.post("/", verifyAdmin, createHotel);

// update :
// localhost:5500/api/hotels/675b4ede04a315264cb82e35
router.put("/:id", verifyAdmin, updateHotel);
// get :
// localhost:5500/api/hotels/675b4ede04a315264cb82e35
router.get("/find/:id", getHotel);
// get:
//  all localhost:5500/api/hotels
//
router.get("/", getHotels);
// delete:
// localhost:5500/api/hotels/675b5691fc25021c925f68ce
router.delete("/:id", verifyAdmin, deleteHotel);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
