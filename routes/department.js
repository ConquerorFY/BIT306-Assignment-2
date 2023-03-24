import express from "express";
import { getAllDepartments, getEmployeeFWARequestsByDepartment, getEmployeeScheduleByDepartment } from "../controllers/department.js";

const router = express.Router();

router.get("/departments", getAllDepartments);
router.post("/getEmployeeFWARequestsByDepartment", getEmployeeFWARequestsByDepartment);
router.post("/getEmployeeScheduleByDepartment", getEmployeeScheduleByDepartment);

export default router;