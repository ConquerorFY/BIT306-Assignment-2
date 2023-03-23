import express from "express";
import { login, logout, registerAccount } from '../controllers/employee.js';

const router = express.Router();

router.post("/registerAccount", registerAccount);
router.post("/login", login);
router.post("/logout", logout);

export default router;