import { redirect } from '@sveltejs/kit';

export const load = ({cookies}) => {
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

    const news = [
        {id: 1, title: 'News 1'},
        {id: 2, title: 'News 2'},
        {id: 3, title: 'News 3'}
    ];

    return { news, email, isAdmin, isGuest};

};

export const actions = {
    log_out: async ({request, cookies}) => {
        cookies.set("user", "", {path: '/', expires: new Date(0)});

        throw redirect(303, '/login')
        //console.log("I mean it's working")
    }
}