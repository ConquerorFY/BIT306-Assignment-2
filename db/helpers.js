import db from "../db/conn.js";

export const insert = async (data, cName) => {
    let collection = await db.collection(cName);
    let result = await collection.insertOne(data);
    return result;
}

export const readOne = async (iQuery, iValue, cName) => {
    let collection = await db.collection(cName);
    let query = { [iQuery]: iValue };
    let result = await collection.findOne(query);

    if (!result) return false;
    return result;
}

export const read = async (iQuery, iValue, cName) => {
    let collection = await db.collection(cName);
    let query = { [iQuery]: iValue };
    let results = await collection.find(query).toArray();

    return results;
}

export const readAll = async (cName) => {
    let collection = await db.collection(cName);
    let results = await collection.find({}).toArray();

    return results;
}

export const updateOne = async (iQuery, iValue, data, cName) => {
    const query = { [iQuery]: iValue };

    const collection = await db.collection(cName);
    let dResult = await collection.deleteOne(query);
    let iResult = await collection.insertOne({
        ...data,
        [iQuery]: iValue
    })
    return iResult;
}