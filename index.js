import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import departmentRoutes from "./routes/department.js";
import employeeRoutes from "./routes/employee.js";
import fwaRoutes from "./routes/fwa.js";
import scheduleRoutes from "./routes/schedule.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/department", departmentRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/fwa", fwaRoutes);
app.use("/api/schedule", scheduleRoutes);

app.listen(3000, () => {
    console.log("Connected");
})