import { Collection, MongoClient } from "mongodb";
import { dbName, dbString } from "./envConfig";

export const client = new MongoClient(dbString);

export const db = client.db(dbName);
export const users = db.collection('users');
export const chats: Collection<any> = db.collection('chats');
export const messages = db.collection('messages');
export const requests = db.collection('requests');
export const groups = db.collection('groups');