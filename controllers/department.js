import { readAll } from "../db/helpers.js";

export const getAllDepartments = async (req, res) => {
    const result = await readAll("department");
    return res.status(200).json(result);
}