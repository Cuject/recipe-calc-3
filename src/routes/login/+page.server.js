import { redirect, fail } from '@sveltejs/kit';
import { sha256, sha224 } from 'js-sha256';

import { json } from "@sveltejs/kit";
import {MongoClient} from 'mongodb';
import { SECRET_URI, DB_NAME } from '$env/static/private';


let client;
let db;
let users;
let user_emails;
let user_hashes;

export const load = async ({cookies}) => {
    client = new MongoClient(SECRET_URI);
    db = client.db(DB_NAME);
    users = await db.collection("users").find().toArray();
    user_emails = users.map((user_email) => {return user_email.email})
    user_hashes = users.map((user_hash) => {return user_hash.hash})

    if (cookies.get("user")){
        throw redirect(307, '/recipes') // redirect to auth route when inputting /news on browser tab, simply change the route path
    }

}

export const actions = {

    login: async ({request, cookies}) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        const user = db.collection("users").find({email: email})

        if (!email || !password) {
            return fail(400, {
                email,
                message: "Missing email or password"
            });
        }
        
        if(!user_emails.includes(email)){
                return fail(400, {
                    email,
                    message: "User doesn't exist"
                });
            }else if(sha224(email+password) === user_hashes[user_emails.indexOf(email)]){
                cookies.set("user", email, {path: '/'});
               //(email);
            }else{
                return fail(400, {
                    email,
                    message: "Incorrect email or password"
            });
        }
            
        
        
        if (cookies.get("email")){
            throw redirect(303, '/recipes'); // Status Code 303 for GET, not POST which is 307
        } 

        return {message: 'Logged in'}

        
    },

    register: async ({request, cookies}) => {
        const data = await request.formData();
        const email = data.get("email");
        const password = data.get("password");

        if (!email || !password) {
            return fail(400, {
                email,
                message: "Missing email or password"
            });
        }
        
        if(user_emails.includes(email)){
                return fail(400, {
                    email,
                    message: "User already exists"
                });
            }else{
                db.collection("users").insertOne({email:email, hash:sha224(email+password)});
        }
        

        cookies.set("user", email, {path: '/'});
       //(email)
        return {message: 'Successfully Registered'}
    },

    guest: async ({request, cookies}) => {
        cookies.set("user", "guest", {path: '/'});
       //("guest")
        return {message: 'Logged in as Guest'}
    },
}