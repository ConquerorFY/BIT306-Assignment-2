import { insert, updateOne, readAll, readOne } from "../db/helpers.js";

// {
//     "scheduleID": 1,
//     "date": "2023-01-01",
//     "workLocation": "flexi-hours",
//     "workHours": "8am - 4pm",
//     "workReport": "None",
//     "supervisorComments": "Still under review",
//     "employeeID": "e001"
// }

export const insertSchedule = async (req, res) => {
    const scheduleData = req.body;
    const results = await insert(scheduleData, "dailyschedule");
    return res.status(200).json({ isSuccess: true, message: 'Daily Schedule has been inserted!' });
}

export const getSchedules = async (req, res) => {
    const supvID = req.body.employeeID;
    let employees = await readAll("employee");
    employees = employees.filter((e) => e.supvID === supvID).map((e) => e.employeeID);
    let schedules = await readAll("dailyschedule");
    schedules = schedules.filter((s) => employees.indexOf(s.employeeID) > -1);
    return res.status(200).json(schedules);
}

export const getScheduleBasedOnDate = async (req, res) => {
    const scheduleDate = req.body.date;
    const empId = req.body.employeeID;
    const results = await readAll("dailyschedule");
    for (let schedule of results) {
        if (schedule.date === scheduleDate && schedule.employeeID === empId) {
            return res.status(200).json({ isFound: true, data: schedule });
        }
    }
    return res.status(200).json({ isFound: false, data: {} });
}

export const updateSchedule = async (req, res) => {
    const scheduleId = req.body.scheduleID;
    const newScheduleData = req.body;

    const scheduleResult = await updateOne("scheduleID", scheduleId, newScheduleData, "dailyschedule");
    return res.status(200).json({ isUpdated: true, data: scheduleResult });
}

export const getNewScheduleID = async (req, res) => {
    const results = await readAll("dailyschedule");
    return res.status(200).json({ isSuccess: true, id: results.length + 1 });
}

export const getScheduleBasedOnID = async (req, res) => {
    const results = await readOne("scheduleID", req.body.scheduleID, "dailyschedule");
    return res.status(200).json({ isSuccess: true, data: results });
}