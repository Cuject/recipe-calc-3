import { redirect } from '@sveltejs/kit';

export const load = async (loadEvent) => {
    
    const { params, fetch, cookies } = loadEvent;
    const { recipeName } = params;

    const response = await fetch('/api/mongo')
    const recipes = await response.json()
    const recipes_names = recipes.recipes.map((recipe_name) => {return recipe_name.name})

    const recipe_index = String(recipes_names.indexOf(recipeName))

    const response2 = await fetch('/api/mongo/' + recipe_index)
    const foodItems = await response2.json()

    const response3 = await fetch('/api/fct')
    const fct = await response3.json()

    let isAdmin = false;
    let isGuest = false;
    const user = cookies.get("user");

    if (!cookies.get("user")){
        throw redirect(307, '/login') // redirect to auth route when inputting /news on browser tab
    }else if(user === "admin"){
        isAdmin = true;
    }else if(user === "guest"){
        isGuest = true;
    }

    const newsAPIKey = "YOUR_NEWS_API_KEY";
    console.log(newsAPIKey);
    //console.log(recipes)
    //console.log(recipes_names)
    //console.log("------------------------------------")

    return{
        foodItems,
        recipe_index,
        fct,
        isAdmin,
        isGuest,
        user
    }
}