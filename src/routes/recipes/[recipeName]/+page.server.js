import { redirect } from '@sveltejs/kit';

export const load = async (loadEvent) => {
    
    const { params, fetch, cookies } = loadEvent;
    const { recipeName } = params;

    let isAdmin = false;
    let isGuest = false;
    const user = cookies.get("user");

    const response = await fetch('/api/fetch/' + String(user))
    const recipes = await response.json()
    const recipes_names = recipes.recipes.map((recipe_name) => {return recipe_name.name})

    const recipe_index = String(recipes_names.indexOf(recipeName))

    const response2 = await fetch('/api/fetch/' + String(user) + "/" + recipe_index)
    const foodItems = await response2.json()

    const response3 = await fetch('/api/fct')
    const fct = await response3.json()


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

export const actions = {
    log_out: async ({request, cookies}) => {
        cookies.set("user", "", {path: '/', expires: new Date(0)});

        throw redirect(303, '/login')
        //console.log("I mean it's working")
    }
}