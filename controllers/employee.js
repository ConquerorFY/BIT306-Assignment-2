import { insert, read, readAll, updateOne } from "../db/helpers.js";
import bcrypt from "bcryptjs";
import { sendMail } from "../emailer/mailer.js";

// {
//     "employeeID": "e001",
//     "name": "John Davidson",
//     "password": "123",
//     "email": "john@mail.com",
//     "position": "employee",
//     "supvID": "e003",
//     "deptID": 2,
//     "FWAStatus": "New"
// }

export const registerAccount = async (req, res) => {
    const existingAccount = await read("employeeID", req.body.employeeID, "employee");
    if (existingAccount.length !== 0) return res.status(200).json({ isSucceed: false, message: "Account already exists!" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const accountData = {
        ...req.body,
        "password": hash
    }
    const result = await insert(accountData, "employee");
    res.status(200).json({ isSucceed: true, message: "Registration success!!" });

    const targetEmail = req.body.email;
    const mailSubject = "Registration Success into FlexIS Management System";
    const mailText = `The password for your accoun would be ${req.body.password}!`;
    sendMail(targetEmail, mailSubject, mailText);
}

export const login = async (req, res) => {
    const targetUsers = await read("employeeID", req.body.employeeID, "employee");
    if (targetUsers.length === 0) return res.status(200).json({ isSucceed: false, message: "Employee not found!" });

    const targetUser = targetUsers[0];
    const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        targetUser.password
    )
    if (!isPasswordCorrect) return res.status(200).json({ isSucceed: false, message: "Wrong employee ID or password!" });
    return res.status(200).json(
        {
            isSucceed: true,
            message: "Login success!!",
            data: {
                employeeID: targetUser.employeeID,
                name: targetUser.name,
                email: targetUser.email,
                position: targetUser.position,
                supvID: targetUser.supvID,
                deptID: targetUser.deptID,
                FWAStatus: targetUser.FWAStatus
            }
        });
}

export const logout = async (req, res) => {
    return res.status(200).json({ isLogout: true, message: "Employee has been logged out!" });
}

export const getEmployeeFWACount = async (req, res) => {
    let flexiCount = 0;
    let wfhCount = 0;
    let hybridCount = 0;

    const employees = await readAll("employee");
    for (let e of employees) {
        if (e.FWAStatus === "flexi-hours") flexiCount++;
        else if (e.FWAStatus === "work-from-home") wfhCount++;
        else if (e.FWAStatus === "hybrid") hybridCount++;
    }

    return res.status(200).json({ flexiCount, wfhCount, hybridCount })
}

export const getSupervisors = async (req, res) => {
    let results = await read("position", "supervisor", "employee");
    results = results.map((s) => {
        return {
            employeeID: s.employeeID,
            name: s.name,
            position: s.position
        }
    })
    return res.status(200).json({ isSucess: true, data: results });
}

export const getEmployees = async (req, res) => {
    let results = await readAll("employee");
    return res.status(200).json({ isSucess: true, data: results });
}

export const updateEmployee = async (req, res) => {
    let results = await updateOne("employeeID", req.body.employeeID, req.body, "employee");
    return res.status(200).json({ isSuccess: true, data: results });
}