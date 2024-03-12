import { json } from "@sveltejs/kit";

export async function GET({cookies}){
    const user_email = cookies.get("user")

    return json({user:user_email})
}