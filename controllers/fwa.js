import { insert, readAll, readOne, updateOne } from "../db/helpers.js";

// {
//     "requestID": 1,
//     "requestDate": "2020-1-1",
//     "workType": "hybrid",
//     "description": "None",
//     "reason": "Too far",
//     "status": "Pending",
//     "comment": "",
//     "employeeID": "e001"
// }

export const insertFWARequest = async (req, res) => {
    const fwaData = req.body;
    const result = await insert(fwaData, "fwarequest");
    return res.status(200).json({ isSucceed: true, message: 'FWA Request has been inserted!' });
}

export const getFWARequests = async (req, res) => {
    const supvID = req.body.employeeID;
    // find all employee IDs under this supvID
    let employees = await readAll("employee")
    employees = employees.filter((e) => e.supvID === supvID).map((e) => e.employeeID);
    // find the fwa requests for the different employees within the list
    let fwaRequests = await readAll("fwarequest");
    let pendingRequests = [], acceptedRequests = [], rejectedRequests = [];
    fwaRequests = fwaRequests.filter((r) => employees.indexOf(r.employeeID) > -1);
    for (let f of fwaRequests) {
        if (employees.indexOf(f.employeeID) > -1) {
            if (f.status === "Pending") pendingRequests.push(f);
            else if (f.status === "Accepted") acceptedRequests.push(f);
            else if (f.status === "Rejected") rejectedRequests.push(f);
        }
    }
    return res.status(200).json({
        isSucceed: true,
        data: {
            pending: pendingRequests,
            accepted: acceptedRequests,
            rejected: rejectedRequests
        }
    });
}

export const updateFWARequest = async (req, res) => {
    const fwaId = req.body.requestID;
    const newFwaData = req.body;

    const fwaResult = await updateOne("requestID", fwaId, newFwaData, "fwarequest");
    if (req.body.status === "Accepted") {
        const empId = req.body.employeeID;
        const empWorkType = req.body.workType;
        const existingEmpData = await readOne("employeeID", empId, "employee");
        const empResult = await updateOne("employeeID", empId, { ...existingEmpData, "FWAStatus": empWorkType }, "employee");
    }
    return res.status(200).json({ isUpdated: true, data: fwaResult });
}

export const getNewFWARequestID = async (req, res) => {
    const results = await readAll("fwarequest");
    return res.status(200).json({ isSucceed: true, id: results.length + 1 });
}

export const getFWARequest = async (req, res) => {
    const result = await readOne("requestID", req.body.requestID, "fwarequest");
    return res.status(200).json({ isSucceed: true, data: result });
}