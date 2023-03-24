import express from "express";
import { getScheduleBasedOnDate, getSchedules, insertSchedule, updateSchedule } from "../controllers/schedule.js";

const router = express.Router();

router.post("/insertSchedule", insertSchedule);
router.post("/getSchedule", getScheduleBasedOnDate);
router.post("/getSchedules", getSchedules);
router.post("/updateSchedule", updateSchedule);

export default router;