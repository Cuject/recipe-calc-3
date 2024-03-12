<script>
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    
    const foodID = $page.params.foodID
    const recipeName = $page.params.recipeName


</script>

<div id="grid">
    <div id="wrap">
        <div id="container">
            <h1>Recipes List / {recipeName} / {foodID}</h1>
            <button on:click={() => {goto('/recipes/' + recipeName)}}>back</button>
        </div>
    </div>
</div>



<style>
    #grid{
        position: relative;
        display: grid;
        grid-template-columns: 1fr 5fr 1fr;
        grid-template-rows: 1fr 7fr 1fr;
        height: 100vh;
    }

    #wrap{
        grid-row-start: 2;
        grid-column-start: 2 ;
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
</style>