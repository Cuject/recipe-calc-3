<script>
    import { createSearchStore, searchHandler } from "$lib/stores/search";
    import { onDestroy } from "svelte";

    export let data;

    const foodItems = data.fct
    const searchfoodItems = foodItems.map((foodItem) => ({
    ...foodItem,
    searchTerms: `${foodItem.food_ID} ${foodItem.food_ND} ${foodItem.com_Name} ${foodItem.edi_Portion}`
    }));

    const searchStore = createSearchStore(searchfoodItems)
    const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
    onDestroy(() => { unsubscribe();})


</script>

<!---
<button on:click={()=>{console.log(foodItems)}}
    class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
    rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">
    fct
</button>

<pre>{JSON.stringify($searchStore.filtered, null, 2)}</pre>-->

<form>
    <input type="search" placeholder="Search e.g. 'Corn'" bind:value={$searchStore.search}/>
</form>

<div class=" grid grid-rows-12">

    {#each $searchStore.filtered as i}
    
        <button  class=" bg-white m-1 border-black border-2"
        on:click={()=> {
            console.log(i)
        }}
        >{i.food_ND}</button>
    {/each}

</div>

