import express from "express";
import { register, login } from "../controllers/auth.js";
const router = express.Router();

router.post("/register", register); //localhost:5500/api/auth/register
router.post("/login", login); //localhost:5500/api/auth/login

export default router;
