import {sessionsCollection, extractCollection, usersCollection} from "../database/db.js"

export async function getExtract(req, res){
    const { token } = req.headers
    
    try {
        const session = await sessionsCollection.findOne({token})
        const extract = await extractCollection.findOne({_id: session?.userId})

        if(!extract){
            return res.sendStatus(401)
        }
        
        //delete user.password;
        res.send(extract)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function addEntry(req, res){
    const entry = req.body; //date, description and value
    const { token } = req.headers

    try {
        const session = await sessionsCollection.findOne({ token });
        const user = await usersCollection.findOne({ _id: session?.userId });

        if (!user) {
        return res.sendStatus(401);
        }

        await extractCollection.insertOne({
        ... entry,
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
    const outgo = req.body; //date, description and value
    const { token } = req.headers

    try {
        const session = await sessionsCollection.findOne({ token });
        const user = await usersCollection.findOne({ _id: session?.userId });

        if (!user) {
        return res.sendStatus(401);
        }

        await extractCollection.insertOne({
        ... outgo,
        userId: user._id,
        isIncoming: false
        });

        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}