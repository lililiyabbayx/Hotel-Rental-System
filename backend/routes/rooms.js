import express from "express";
import { verifyAdmin } from "../utils/verifyToken.js";


import { createRoom,
        deleteRoom,
        getRooms,
        getRoom,
        updateRoom} from "../controllers/room.js";

const router = express.Router();
//create :
// localhost:5500/api/hotels
router.post("/:hotelid", verifyAdmin, createRoom);

// update :
// localhost:5500/api/hotels/675b4ede04a315264cb82e35
router.put("/:id", verifyAdmin, updateRoom);
// get :
// localhost:5500/api/hotels/675b4ede04a315264cb82e35
router.get("/:id", getRoom);
// get:
//  all localhost:5500/api/hotels
//
router.get("/:id", getRooms);
// delete:
// localhost:5500/api/hotels/675b5691fc25021c925f68ce
router.delete("/:id", verifyAdmin, deleteRoom);
export default router;

