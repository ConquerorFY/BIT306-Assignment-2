import express from "express";
import { getFWARequests, insertFWARequest, updateFWARequest, getNewFWARequestID } from "../controllers/fwa.js";

const router = express.Router();

router.post("/insertFWA", insertFWARequest);
router.post("/getFWA", getFWARequests);
router.post("/updateFWA", updateFWARequest);
router.get("/getNewFWARequestID", getNewFWARequestID);

export default router;