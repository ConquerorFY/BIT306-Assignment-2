import { MongoClient } from "mongodb";
import "../loadEnvironment.js";

const connectionString = process.env.CONNECTION_STRING || "";
const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}

let db = conn.db("FlexIS");
export default db;