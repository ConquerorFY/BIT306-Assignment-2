import express from "express";
import { getEmployeeFWACount, getEmployees, getSupervisors, login, logout, registerAccount, updateEmployee } from '../controllers/employee.js';

const router = express.Router();

router.post("/registerAccount", registerAccount);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getEmployeeFWACount", getEmployeeFWACount);
router.get("/getSupervisors", getSupervisors);
router.get("/getEmployees", getEmployees);
router.post("/updateEmployee", updateEmployee);

export default router;