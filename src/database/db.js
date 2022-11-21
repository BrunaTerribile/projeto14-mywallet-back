import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

// Conexão com o Mongo
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("MongoDB conected!");
} catch (err){
    console.log(err);
}

// Criação do banco e coleções
const db = mongoClient.db("mywallet");
export const usersCollection = db.collection("users");
export const extractCollection = db.collection("extract");
export const sessionsCollection = db.collection("sessions");