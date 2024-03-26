import { redirect } from '@sveltejs/kit';

export const load = async (loadEvent) => {
    const { fetch , cookies} = loadEvent;

    let isAdmin = false;
    let isGuest = false;
    const user = cookies.get("user")

    const title =  "Recipes List"
    const response = await fetch('/api/fetch/' + String(user))
    const recipes = await response.json()
    

    

    if (!cookies.get("user")){
        throw redirect(307, '/login') // redirect to auth route when inputting /news on browser tab
    }else if(user === "admin"){
        isAdmin = true;
    }else if(user === "guest"){
        isGuest = true;
    }

    const newsAPIKey = "YOUR_NEWS_API_KEY";
    console.log(newsAPIKey);



    return{
        title,
        recipes,
        user,
        isAdmin,
        isGuest
    }
};

export const actions = {
    log_out: async ({request, cookies}) => {
        cookies.set("user", "", {path: '/', expires: new Date(0)});

        throw redirect(303, '/login')
        //console.log("I mean it's working")
    }
}