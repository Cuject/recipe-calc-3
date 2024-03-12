import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private';

export async function GET(){
    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const fct = await db.collection('fct').find().toArray()

    return json(fct)
}