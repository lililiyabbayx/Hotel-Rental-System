import express from "express";
import {
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} from "../controllers/user.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();
//check auth
// //localhost:5500/api/users/checkauthentication
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user! you are logged in");
});
// //checkuser
// //localhost:5500/api/users/checkuser/675bf569153d0a65f3b8e2e0
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user! you are logged in you can delete you account");
// });
// //check admin first login then checkadmin(must delete cookie)
// //localhost:5500/api/users/checkadmin/675bf569153d0a65f3b8e2e0
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello admin! you are logged in you can delete all users account");
// });
// update :
//
router.put("/:id", verifyUser, updateUser);
// get :
//
router.get("/:id", verifyUser, getUser);
// get:
//
//
router.get("/", verifyAdmin, getUsers);
// delete:
//
router.delete("/:id", verifyUser, deleteUser);

export default router;
