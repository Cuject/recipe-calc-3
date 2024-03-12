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

    return {isAdmin, isGuest}
}