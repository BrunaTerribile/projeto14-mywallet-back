import sessionsCollection from "../db"

export async function getExtract(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "")

    if(!authorization) {
        return res.sendStatus(401)
    }

    try {
        const session = await sessionsCollection.findOne({token})
        const user = await usersCollection.findOne({_id: session?.userId})

        if(!user){
            return res.sendStatus(401)
        }
        
        delete user.password;
        res.send(user)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}

export async function addEntry(req, res){
}

export async function addOutgo(req, res){

}