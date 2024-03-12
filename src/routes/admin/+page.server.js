import { redirect, fail } from '@sveltejs/kit';

export const load = async ({cookies}) => {
    if (cookies.get("user")){
        throw redirect(307, '/recipes') // redirect to auth route when inputting /news on browser tab, simply change the route path
    }
}

export const actions = {
    login: async ({request, cookies}) => {
        const data = await request.formData();
        const password = data.get("password");

        if(password === "peaches"){
            cookies.set("user", "admin", {path: '/'});
        }else{
            return fail(400, {
                message: "Incorrect Password"
            });
        }
    }
}