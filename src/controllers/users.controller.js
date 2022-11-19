import usersCollection from "../index"
import bcrypt from "bcrypt"
import { v4 as uuidV4 } from "uuid"

export async function signUp(req, res){
    const user = req.body;

    try {
        const userExist = await usersCollection.findOne({ email: user.email }); //verifica se este email já foi cadastrado anteriormente
        if(userExist) {
            return res.sendStatus(409) //conflito
        }

        const { error } = userSchema.validate(user, { abortEarly: false}); //valida os dados vindos do front
        if(error){
            const errors =error.details.map((d) => d.message);
            return res.status(400).send(errors)
        }
    
        const hashPassword = bcrypt.hashSync(user.password, 10) //criptografa a senha do usuário

        await usersCollection.insertOne({...user, password: hashPassword});
        res.sendStatus(201)
    } catch (err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function signIn(req, res){
    const { email, password } = req.body;
    const token = uuidV4();

    try {
        const userExist = await usersCollection.findOne({ email }); //verifica se o email está cadastrado do bd
        if(!userExist) {
            return res.sendStatus(401)
        }
        const passwordOk = bcrypt.compareSync(password, userExist.password); //verifica se a senha foi preenchida corretamente
        if(!passwordOk) {
            return res.sendStatus(401)
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
}