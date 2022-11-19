import express from 'express';
import cors from 'cors';
import { signIn, signUp } from './controllers/authController';
import { getExtract, addEntry, addOutgo } from './controllers/userController';
import joi from 'joi'

const userSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email().required()
})

const app = express();
app.use(cors());
app.use(express.json());

//Rotas 
app.post("/", signIn);

app.post("/sign-up", signUp);

app.get("/extract", getExtract);

app.post("/new-entry", addEntry);

app.post("/new-outgo", addOutgo);


const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running in port: ${port}`));