import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("MongoDB conected!");
}catch (err){
    console.log(err);
}

const db = mongoClient.db("mywalllet");
const usersCollection = db.collection("users");
const extractCollection = db.collection("extract");






app.listen(5000, () => console.log("Port 5000"));