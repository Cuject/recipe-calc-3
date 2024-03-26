import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI , DB_NAME } from '$env/static/private';



export async function GET(RequestEvent){
    const { params } = RequestEvent;
    const { user, recipeIndex} = params; // Should be the name of the route
    
    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();

    const recipe_data = recipes_data[recipeIndex]

    return json(recipe_data)
}



export async function POST(RequestEvent){
    const { params, request } = RequestEvent;
    const { recipeIndex, user } = params; // Should be the name of the route
    const { new_food_item } = await request.json()

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})

    const recipe_food_items = recipes_data[recipeIndex].food_items
    const recipe_food_IDs = recipe_food_items.map((food_name) => {return food_name.food_ID})

    if(new_food_item == "" || recipe_food_IDs.includes(new_food_item)){
        return json({message: new_food_item + "already exists"}, {status: 201});
    }else{
        db.collection("recipes").updateOne(
            {user: user, name:recipes_names[recipeIndex]}, 
            { $push: {food_items:{food_ID: new_food_item, qty:100} }}
        )
    }

    return json({
        food_ID: new_food_item,
        qty: 100
    })

}


export async function PATCH(RequestEvent){
    const { params, request } = RequestEvent;
    const { recipeIndex, user} = params; // Should be the name of the route

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})

    const { new_name } = await request.json()

    if(new_name == "" || recipes_names.includes(new_name)){ 
        return json({message: "already exists or empty string"}, {status: 201});
    }else{
        db.collection("recipes").updateOne({user:user, name:recipes_names[recipeIndex] }, {$set : {name:new_name}});
    }

    return json(
        {
            _id: recipes_data[recipeIndex]._id, 
            user:user, name: new_name, 
            food_items: recipes_data[recipeIndex].food_items 
        });
}


export async function DELETE(RequestEvent){
    const { params } = RequestEvent;
    const { recipeIndex , user} = params;

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})


    const deleted = {user: user, name:recipes_names[recipeIndex]}

    db.collection("recipes").deleteOne(deleted);

    return json(deleted)
}