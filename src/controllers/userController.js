import { sessionsCollection, extractCollection, usersCollection } from "../database/db.js"
import joi from 'joi'

const extractSchema = joi.object({
    date: joi.string().required(),
    description: joi.string().required(),
    value: joi.number().required()
})


export async function getExtract(req, res){
    const token = res.token;
    
    try {
        const session = await sessionsCollection.findOne({ token });
        const user = await usersCollection.findOne({ _id: session?.userId });

        if(!user){
            return res.sendStatus(401)
        }

        const extract = await extractCollection.find({userId: user._id}).toArray();
        res.status(201).send(extract)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function addEntry(req, res){
    const { date, description, value } = req.body;
    const user = res.locals.user

    try {
        const newEntry = {
            date,
            description,
            value
        }

        const { error } = extractSchema.validate(newEntry, { abortEarly: false}); //valida os dados vindos do front
        if(error){
            const errors =error.details.map((d) => d.message);
            return res.status(400).send(errors)
        }

        await extractCollection.insertOne({
        ...newEntry,
        userId: user._id,
        isIncoming: true
        });

        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export async function addOutgo(req, res){
    const { date, description, value } = req.body;
    const user = res.locals.user
    
    try {
        const newOutgo = {
            date,
            description,
            value
        }

        const { error } = extractSchema.validate(newOutgo, { abortEarly: false}); //valida os dados vindos do front
        if(error){
            const errors =error.details.map((d) => d.message);
            return res.status(400).send(errors)
        }

        await extractCollection.insertOne({
        ...newOutgo,
        userId: user._id,
        isIncoming: false
        });

        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}