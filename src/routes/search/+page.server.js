import { redirect } from '@sveltejs/kit';

export const load = async (loadEvent) => {

    const { params, fetch, cookies } = loadEvent;
    const { recipeName } = params;

    const response3 = await fetch('/api/fct')
    const fct = await response3.json()



    let isAdmin = false;
    let isGuest = false;
    const email = cookies.get("user");

    if (!cookies.get("user")){
        throw redirect(307, '/login') // redirect to auth route when inputting /news on browser tab
    }else if(email === "admin"){
        isAdmin = true;
    }else if(email === "guest"){
        isGuest = true;
    }

    const newsAPIKey = "YOUR_NEWS_API_KEY";
    console.log(newsAPIKey);

    return { email, isAdmin, isGuest, fct};

};
