<script>
    import { enhance } from '$app/forms';
    export let form;
</script>

<form method="post" action="?/login" use:enhance>
    <div class="grid grid-cols-3 grid-rows-3 bg-slate-300 text-xl h-screen">
        <div class="grid grid-rows-4 col-start-2 row-start-2 justify-items-center flex-col-reverse">
            <h1>ADMIN LOGIN</h1>
            <p>{form?.message || ''}</p>
            <input type="password" name="password" placeholder="Password"
            class="border-slate-500 border-2 rounded bg-slate-50 px-2">
            <button type="submit"
            class=" items-center px-6 py-1 m-4 mb-2 text-white bg-green-500 
            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Login</button>
        </div>
    </div>
</form>
