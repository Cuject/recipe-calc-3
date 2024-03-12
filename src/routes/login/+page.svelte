<script>
    import { enhance } from '$app/forms';

    
    export let form;
    export let data;
</script>

<form method="post" action="?/login" use:enhance>
    <div class="grid grid-cols-3 grid-rows-3 bg-slate-300 text-2xl h-screen">
        <div class="grid grid-rows-5 col-start-2 row-start-2 justify-items-center flex-col-reverse">
            <div>
                <h1>Recipe Nutrition Calculator</h1>
            </div>
            <div>
                <input type="email" name="email" placeholder="Email" value={form?.email ?? ''}
                class="border-slate-500 border-2 rounded bg-slate-50 px-2">
            </div>
            <div>
                <input type="password" name="password" placeholder="Password"
                class="border-slate-500 border-2 rounded bg-slate-50 px-2">
            </div>

            

            <p>{form?.message || ''}</p>

            <!--<button type="submit"
            class="inline-flex items-center justify-center 
                    w-full px-6 py-3 mb-2 text-lg text-white bg-green-500 
                    rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Login</button> -->

            <div>
                <button type="submit"
                class=" items-center px-6 py-3 mb-2 text-white bg-green-500 
                rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Login</button>

                <button formaction="?/register"
                class=" items-center px-6 py-3 mb-2 text-white bg-green-500 
                rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Register</button>
            </div>

            <div>
                <button formaction="?/guest" class="underline hover:text-slate-600 py-3 my-2">Log In as Guest</button>
            </div>

        </div>
    </div>  
</form>

<button on:click={() => {console.log(data.accounts)}}
    class="visibility: hidden"><h1>Users</h1></button>

