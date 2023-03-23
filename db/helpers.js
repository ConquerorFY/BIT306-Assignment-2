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