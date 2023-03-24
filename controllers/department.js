import { readAll } from "../db/helpers.js";

// {
//     "deptID": 1,
//     "deptName": "Human Resource"
// }

export const getAllDepartments = async (req, res) => {
    const result = await readAll("department");
    return res.status(200).json(result);
}

export const getEmployeeFWARequestsByDepartment = async (req, res) => {
    let departmentId = req.body.deptID;
    let resultsCount = {};

    // find all employees under the same department
    let employees = await readAll("employee");
    employees = employees.filter(e => e.deptID === departmentId).map(e => e.employeeID);

    let fwa = await readAll("fwarequest");
    fwa = fwa.filter(f => employees.indexOf(f.employeeID) > -1);

    for (let f of fwa) {
        if (!(f.requestDate in resultsCount)) {
            resultsCount[f.requestDate] = 1;
        } else {
            resultsCount[f.requestDate] += 1;
        }
    }

    return res.status(200).json({ isSuccess: true, data: resultsCount });
}

export const getEmployeeScheduleByDepartment = async (req, res) => {
    let departmentId = req.body.deptID;
    let targetDate = req.body.date;

    // find all employees under the same department
    let employees = await readAll("employee");
    employees = employees.filter(e => e.deptID === departmentId).map(e => e.employeeID);

    let schedules = await readAll("dailyschedule");
    schedules = schedules.filter(s => employees.indexOf(s.employeeID) > -1 && s.date === targetDate);
    return res.status(200).json({ isSuccess: true, data: schedules });
}
