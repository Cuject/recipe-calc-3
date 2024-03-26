<script>
    import { goto } from "$app/navigation";
    import { json } from "@sveltejs/kit";
    
    export let data;
    const recipes = data.recipes.recipes;
    let recipes_names = recipes.map((recipe_name) => {return recipe_name.name})

    let recipe_name_input = ''
    let edit_name_input = ''

    let isPopUp = false;
    let isInputValid = true;
    let addPopUp = false;
    let delPopUp = false;
    let delIndex = 0;

    let editPopUp = false;
    let editIndex = 0;



    async function addRecipe() {
        const res = await fetch('/api/fetch/' + String(data.user), {
			method: 'POST',
			body: JSON.stringify({
                append_input: recipe_name_input
			})
		})

        if(recipe_name_input == "" || recipes_names.includes(recipe_name_input)){
            console.log("empty string or already exists")
            isInputValid = false;
        }else{
            isInputValid = true;
            addPopUp = false;
            recipes_names.push(recipe_name_input)
            recipes_names = recipes_names
            recipe_name_input = '';
        }
        
        return json(res)
    }

    async function editRecipe(index) {
        
        const res = await fetch('/api/fetch/' + String(data.user) + "/" + String(index), {
			method: 'PATCH',
			body: JSON.stringify({
                new_name: edit_name_input
			})
		})
        

        if(edit_name_input == "" || recipes_names.includes(edit_name_input)){
            console.log("already exists or empty string")
            isInputValid = false;
        }else{
            isInputValid = true;
            editPopUp = false;
            recipes_names.splice(index, 1, edit_name_input)
            recipes_names = recipes_names
            edit_name_input = '';
        }
        
        return json(res)

    }

    async function delRecipe(index) {
        const res = await fetch('/api/fetch/' + String(data.user) +"/" + String(index), {
			method: 'DELETE'
		})
        delPopUp = false
        recipes_names.splice(index, 1)
        recipes_names = recipes_names
        return json(res)
    }

    function printIndex(index){console.log(index);}

    function food_ITEMS(recipe){
        goto('/recipes/' + recipe);
    }

  

</script>

<div id="debug">
    <button on:click={() => {
        console.log(recipes_names);
    }}>Console Log</button>
</div>

{#if isPopUp}
    <div id="translucent"></div>
    <div id="popUP">
        <div id="panel">
            <div class=" row-start-2 col-start-2 bg-blue-700">

                <div>lorem ipsum</div>
                <div><input class="border-slate-500 border-2 rounded bg-slate-50 px-2"/></div>
                <div>placeholder text</div>
                <div>
                    <button>Okay</button>
                    <button on:click={() => {isPopUp = false}}>Cancel</button>

                </div>
            </div>
        </div>
    </div>
{/if}

{#if addPopUp}
    <div id="translucent"></div>
    <div id="popUP">
        <div id="panel">

            <div class=" bg-blue-100 row-start-2 flex flex-col">

                <div>Enter Recipe Name:</div>
                <div><input bind:value={recipe_name_input} class="border-slate-500 border-2 rounded bg-slate-50 px-2"/></div>
                {#if !isInputValid}
                <div>"empty string or already exists"</div>
                {/if}
                <div>
                    <button on:click={addRecipe}
                    class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                    rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Okay</button>

                    <button on:click={() => {addPopUp = false; recipe_name_input = ''; isInputValid = true}}
                    class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                    rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Cancel</button>
                </div>
            </div>
        </div>
    </div>
{/if}

{#if editPopUp}
    <div id="translucent"></div>
    <div id="popUP">
        <div id="panel">
            <div>Change Name of "{recipes_names[editIndex]}"</div>
            <div><input bind:value={edit_name_input} class="border-slate-500 border-2 rounded bg-slate-50 px-2"/></div>
            {#if !isInputValid}
            <div>"already exists or empty string"</div>
            {/if}
            <div>
                <button on:click={editRecipe(editIndex)}
                class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Okay</button>

                <button on:click={() => {editPopUp = false; edit_name_input = ''; isInputValid = true}}
                class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Cancel</button>
            </div>
        </div>
    </div>
{/if}

{#if delPopUp}
    <div id="translucent"></div>
    <div id="popUP">
        <div id="panel">
            <div>Delete "{recipes_names[delIndex]}"?</div>
            <div>
                <button on:click={delRecipe(delIndex)}
                class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Okay</button>

                <button on:click={() => {delPopUp = false}}
                class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Cancel</button>
            </div>
        </div>
    </div>
{/if}


<div id="grid">
    <div id="wrap">
        <div id="container">
            <h1>{data.title}</h1>
            <h1>Logged In as {data.user}</h1>
            <div >
                <button on:click={() => {addPopUp = true}} id="addBtn"
                    class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Add Recipe</button>

                <form method="post" action="?/log_out">
                    <button type="submit"
                    class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                    rounded-md hover:bg-green-400 sm:w-auto sm:mb-0"> Log Out </button>
                </form>
            </div>
            <div style="display: none;">
                <input bind:value={recipe_name_input}/>
                <button on:click={addRecipe}>Add</button>
                <button on:click={() => {isPopUp = true}}>PopUp</button>
                <button on:click={() => {addPopUp = true}}>AddPopUp</button>
            </div>
            <div id="recipes" >
                {#each recipes_names as recipe, i}
                    <div id="recipe">
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div id="recipe_btn" on:click={() => {food_ITEMS(recipes_names[i])}}>
                            {recipe}
                        </div>
                        
                        <button on:click={() => {editIndex = i; editPopUp = true;}}
                            class=" items-center px-2 border-sold border-green-700 text-white bg-green-500 
                             hover:bg-green-400 sm:w-auto sm:mb-0 ">Edit</button>

                        <button on:click={() => {delIndex = i; delPopUp = true}}
                            class=" items-center px-2 border-sold border-green-700 text-white bg-green-500 
                             hover:bg-green-400 sm:w-auto sm:mb-0 ">Delete</button>
                    </div>
                {/each}
            </div>
            <button on:click={() => {goto('/fct')}}
                class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">FCT</button>
        </div>
    </div>

    {#if data.isAdmin}
        <h1>Displays when Admin is logged in</h1>
    {/if}

    {#if data.isGuest}
        <h1>Displays when Guest is logged in</h1>
    {/if}
</div>



<style>

    #recipe_btn{
        cursor: pointer;
        width: 100%;
        padding: 5px;
        padding-left: 15px;

        
    }
    #translucent{
        z-index: 1;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;
        background-color: white;
        opacity: 60%;

    }

    #popUP{
        z-index: 2;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;

        display: grid;
        grid-template-columns: 2fr 1fr 2fr;
        grid-template-rows: 0.75fr 1fr 1fr;
    }

    #panel{
        display: grid;
        grid-row-start: 2;
        grid-column-start: 2;

        border-radius: 25px;
        background-color: red;
        border: 4px solid #71C49C;

        gap: 2px;

        grid-template-rows: 1fr 1fr 1fr;
    }

    #panel div{
        display: flex;
        background-color: white;
        justify-content: center;
    }

    #grid{
        display: grid;
        height: 100vh;
        width: 100%;
        grid-template-columns: 1fr 3fr 1fr;
        grid-template-rows: 1fr 3fr 1fr;

    }

    #wrap{
        grid-column-start: 2;
        grid-row-start: 2;
        border: 5px solid white;
        border-radius: 25px;            
        padding: 4px;
        display: grid;
    }

    #container{
        position: relative;
        background-color: white;
        width: auto;
        padding: 10px;
        padding-left: 40px;
        padding-right: 40px;
        border-radius: 20px;
    }

    #recipes{
        height: 250px;
        overflow: auto;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 5px;
        border: 4px solid #71C49C;
        border-radius: 0px;
    }

    #recipe{

        border: 3px solid #71C49C;
        margin-bottom: 5px;
        display: grid;
        grid-template-columns: 8fr 1fr 1fr;
    }


    #recipe:hover{
        border: 3px solid #3A7659;
        background-color: #ececec;
    }

    #debug{
        display: none;
    }


    #addBtn{
        font-size: 1.25rem;
    }

    
</style>