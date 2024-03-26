import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private'; 
import { user_name } from "$lib/cookie.js";
import { user } from "$lib/stores/cookie.js";
import { cookie } from '@sveltejs/kit';


//let user_email = "nio@gmail.com";

//user.subscribe(value => {user_email = value;});


//=============================================================================================

export async function GET(RequestEvent){
    const { params } = RequestEvent;
    const { user } = params;
    
    const client = new MongoClient(SECRET_URI)
    const db = client.db(DB_NAME)
    const recipes = await db.collection('recipes').find({user: user}).toArray()

    return json({recipes, user: user})
}

export async function POST(RequestEvent ){

    const { params } = RequestEvent;
    const { user } = params;

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})

    const { request } = RequestEvent;
    const { append_input } = await request.json()

    if(append_input == "" || recipes_names.includes(append_input)){ 
        return json({message: append_input + " already exists"}, {status: 201});
    }else{
        db.collection("recipes").insertOne({user:user, name:append_input, food_items:[] });
    }

    return json({user:user, name:append_input, food_items:[]}, {status: 201});
}