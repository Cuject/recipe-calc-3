import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private';

//let user_email= 'nio@gmail.com';

export async function GET(RequestEvent){
    const { params } = RequestEvent;
    const { user, foodIndex, recipeIndex } = params;

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})

    const recipe_food_items = recipes_data[recipeIndex].food_items

    return json(recipe_food_items[foodIndex])
}

export async function PATCH(RequestEvent){
    const { params, request } = RequestEvent;
    const { user, recipeIndex, foodIndex } = params; // Should be the name of the route

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})

    const { new_qty } = await request.json()

    if(recipes_data[recipeIndex].food_items.length === 0){
        return json({message: recipes_names[recipeIndex] + " is empty, No food items can be edited"}, {status: 201});
    }else{
        if(foodIndex >= recipes_data[recipeIndex].food_items.length){
            return json({message: "index exceeds range or not valid"}, {status: 201});

        }else{

            db.collection("recipes").updateOne({
                user:user, name:recipes_names[recipeIndex], "food_items.food_ID": recipes_data[recipeIndex].food_items[foodIndex].food_ID
            }, 
                { $set: { 'food_items.$.qty': new_qty } 
            })
            
            return json({
                food_ID: recipes_data[recipeIndex].food_items[foodIndex].food_ID,
                qty: new_qty
            })
        }
    }
}



export async function DELETE(RequestEvent){
    const { params } = RequestEvent;
    const { user, recipeIndex, foodIndex } = params;

    const client = new MongoClient(SECRET_URI);
    const db = client.db(DB_NAME)
    const recipes_data = await db.collection("recipes").find({user: user}).toArray();
    const recipes_names = recipes_data.map((recipe_name) => {return recipe_name.name})

    const recipe_food_items = recipes_data[recipeIndex].food_items
    const recipe_food_IDs = recipe_food_items.map((food_name) => {return food_name.food_ID})

    db.collection("recipes").updateOne(
        {user: user, name:recipes_names[recipeIndex]}, 
        { $pull: {food_items:{food_ID: recipes_data[recipeIndex].food_items[foodIndex].food_ID } }})

    return json(recipe_food_items[foodIndex])
}