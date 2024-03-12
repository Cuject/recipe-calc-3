import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private';
import { sha256, sha224 } from 'js-sha256';

export async function GET(){
    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const users = await db.collection('users').find().toArray() 

    return json(users)
}

export async function POST(RequestEvent){
    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME);
    const users = await db.collection('users').find().toArray() 
    const emails = users.map((user_email) => {return user_email.email})

    const { request } = RequestEvent;
    const { email, password } = await request.json()

    const hash = sha224(email+password)

    if(emails.includes(email)){
        return json({exists: true}, {status: 201});
    }else{
        db.collection("users").insertOne({email:email, hash:hash});
        return json(
            {
                exists: false,
                email: email,
                hash: hash
            }
        ,{status: 201});
    }

}