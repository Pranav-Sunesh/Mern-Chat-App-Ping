import { MongoClient } from "mongodb";
import { dbName, dbString } from "./envConfig";

export const client = new MongoClient(dbString);

export const db = client.db(dbName);
export const users = db.collection('users');
export const chats = db.collection('chats');
export const messages = db.collection('messages');
export const contacts = db.collection('contacts');