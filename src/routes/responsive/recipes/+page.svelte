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
        goto('responsive/recipes/' + recipe);
    }

  

</script>

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
                    >Okay</button>

                    <button on:click={() => {addPopUp = false; recipe_name_input = ''; isInputValid = true}}
                    >Cancel</button>
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
                >Okay</button>

                <button on:click={() => {editPopUp = false; edit_name_input = ''; isInputValid = true}}
                >Cancel</button>
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
                >Okay</button>

                <button on:click={() => {delPopUp = false}}
                >Cancel</button>
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
                    >Add Recipe</button>

                <form method="post" action="?/log_out">
                    <button type="submit"
                    > Log Out </button>
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
                >FCT</button>
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

</style>