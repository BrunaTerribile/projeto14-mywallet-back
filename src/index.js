import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { signIn, signUp } from './controllers/users.controller';
import dotenv from 'dotenv';
import joi from 'joi'

const userSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email().required()
})

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("MongoDB conected!");
} catch (err){
    console.log(err);
}

const db = mongoClient.db("mywalllet");
const usersCollection = db.collection("users");
const extractCollection = db.collection("extract");
const sessionsCollection = db.collection("sessions")


app.post("/", signIn);

app.post("/sign-up", signUp);

app.get("/extract", getExtract);

app.post("/new-entry", addEntry);

app.post("/new-outgo", addOutgo);



app.listen(5000, () => console.log("Port 5000"));