import express from 'express';
import cors from 'cors';
import { signIn, signUp } from './controllers/authController.js';
import { getExtract, addEntry, addOutgo } from './controllers/userController.js';

const app = express();
app.use(cors());
app.use(express.json());

//Rotas 
app.post("/sign-in", signIn);

app.post("/sign-up", signUp);

app.get("/extract", getExtract);

app.post("/new-entry", addEntry);

app.post("/new-outgo", addOutgo);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));