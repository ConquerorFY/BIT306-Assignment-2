import { insert, read } from "../db/helpers.js";
import bcrypt from "bcryptjs";

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
    if (existingAccount.length !== 0) return res.status(409).json("Account already exists!");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const accountData = {
        ...req.body,
        "password": hash
    }
    const result = await insert(accountData, "employee");
    res.send(result).status(204);
}

export const login = async (req, res) => {
    const targetUsers = await read("employeeID", req.body.employeeID, "employee");
    if (targetUsers.length === 0) return res.status(404).json("Employee not found!");

    const targetUser = targetUsers[0];
    const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        targetUser.password
    )
    if (!isPasswordCorrect) return res.status(400).json("Wrong employee ID or password!");
    return res.status(200).json({
        employeeID: targetUser.employeeID,
        name: targetUser.name,
        email: targetUser.email,
        position: targetUser.position,
        supvID: targetUser.supvID,
        deptID: targetUser.deptID,
        FWAStatus: targetUser.FWAStatus
    })
}

export const logout = async (req, res) => {
    return res.status(200).json({ isLogout: true, message: "Employee has been logged out!" });
}