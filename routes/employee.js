import express from "express";
import { getEmployeeFWACount, getSupervisors, login, logout, registerAccount } from '../controllers/employee.js';

const router = express.Router();

router.post("/registerAccount", registerAccount);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getEmployeeFWACount", getEmployeeFWACount);
router.get("/getSupervisors", getSupervisors);

export default router;