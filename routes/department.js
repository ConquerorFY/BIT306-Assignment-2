import express from "express";
import { getAllDepartments } from "../controllers/department.js";

const router = express.Router();

router.get("/departments", getAllDepartments);

export default router;