<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { json } from "@sveltejs/kit";
    import { parse } from "svelte/compiler";

    import AppPdf from "$lib/components/AppPdf.svelte";
    import Page from "$lib/components/Page.svelte";

    import { createSearchStore, searchHandler } from "$lib/stores/search";
    import { onDestroy } from "svelte";

    export let data;
    const recipe_data = data.foodItems
    const recipe_name = $page.params.recipeName
    const recipe_index = data.recipe_index
    const fct = data.fct

    let foodID_input = ''

    let food_Data = recipe_data.food_items
    let food_IDs  = recipe_data.food_items.map((ID) => {return ID.food_ID})

    let food_qtys = recipe_data.food_items.map((ID) => {return ID.qty})

    let is_table_view = true
    let addPopUp = false;



    let mod_food_Data = food_IDs.map((ID) => {
        return fct.find(element => element.food_ID == ID)
    });     

    let new_mod_Data = mod_food_Data.map((Data, i) => {
        return {
            FA_mono: parseFloat(Data.FA_mono),
            FA_poly: parseFloat(Data.FA_poly),
            ash: parseFloat(Data.ash),
            beta_carotene: parseFloat(Data.beta_carotene),
            calcium: parseFloat(Data.calcium),
            carbohydrates: parseFloat(Data.carbohydrates),
            cholesterol: parseFloat(Data.cholesterol),
            com_Name: Data.com_Name,
            edi_Portion: Data.edi_Portion,
            energy: parseFloat(Data.energy),
            fiber: parseFloat(Data.fiber),
            food_ID: Data.food_ID,
            food_ND: Data.food_ND,
            iron: parseFloat(Data.iron),
            niacin: parseFloat(Data.niacin),
            phosphorus: parseFloat(Data.phosphorus),
            protein: parseFloat(Data.protein),
            rae: parseFloat(Data.rae),
            riboflavin: parseFloat(Data.riboflavin),
            sci_Name: Data.sci_Name,
            sodium: parseFloat(Data.sodium),
            sugars: parseFloat(Data.sugars),
            thiamin: parseFloat(Data.thiamin),
            total_fat: parseFloat(Data.total_fat),
            vit_A: parseFloat(Data.vit_A),
            vit_C: parseFloat(Data.vit_C),
            water: parseFloat(Data.water),
            _id: Data._id,
            visible: true
        }
    })

    let foods_water         = new_mod_Data.map((data, i) => {return data.water          * (food_qtys[i]/100)})
    let foods_energy        = new_mod_Data.map((data, i) => {return data.energy         * (food_qtys[i]/100)})
    let foods_protein       = new_mod_Data.map((data, i) => {return data.protein        * (food_qtys[i]/100)})
    let foods_total_fat     = new_mod_Data.map((data, i) => {return data.total_fat      * (food_qtys[i]/100)})
    let foods_carbohydrates = new_mod_Data.map((data, i) => {return data.carbohydrates  * (food_qtys[i]/100)})
    let foods_ash           = new_mod_Data.map((data, i) => {return data.ash            * (food_qtys[i]/100)})
    let foods_fiber         = new_mod_Data.map((data, i) => {return data.fiber          * (food_qtys[i]/100)})
    let foods_sugars        = new_mod_Data.map((data, i) => {return data.sugars         * (food_qtys[i]/100)})

    let foods_water_total           = 0
    let foods_energy_total          = 0
    let foods_protein_total         = 0
    let foods_total_fat_total       = 0
    let foods_carbohydrates_total   = 0
    let foods_ash_total             = 0
    let foods_fiber_total           = 0
    let foods_sugars_total          = 0

    foods_water         .forEach(element => {foods_water_total          += element});
    foods_energy        .forEach(element => {foods_energy_total         += element});
    foods_protein       .forEach(element => {foods_protein_total        += element});
    foods_total_fat     .forEach(element => {foods_total_fat_total      += element});
    foods_carbohydrates .forEach(element => {foods_carbohydrates_total  += element});
    foods_ash           .forEach(element => {foods_ash_total            += element});
    foods_fiber         .forEach(element => {foods_fiber_total          += element});
    foods_sugars        .forEach(element => {foods_sugars_total         += element});


    async function addFoodItem() {
        const res = await fetch('/api/fetch/' + String(data.user) + "/" + String(recipe_index)  , {
			method: 'POST',
			body: JSON.stringify({
                new_food_item: foodID_input
			})
		})

        if(foodID_input == "" || food_IDs.includes(foodID_input)){
            console.log("empty string or already exists")
        }else{
            food_Data.push({
                food_ID : foodID_input,
                qty: 100
            })
            food_Data = food_Data

            food_IDs.push(foodID_input)
            food_IDs = food_IDs

            mod_food_Data.push(fct.find(element => element.food_ID == foodID_input))
            mod_food_Data = mod_food_Data

            new_mod_Data.push( //fct.find(element => element.food_ID == foodID_input).sugars == "-" ? 0 : parseFloat(fct.find(element => element.food_ID == foodID_input).sugars)
                {
                    FA_mono:        parseFloat(fct.find(element => element.food_ID == foodID_input).FA_mono),
                    FA_poly:        parseFloat(fct.find(element => element.food_ID == foodID_input).FA_poly),
                    ash:            parseFloat(fct.find(element => element.food_ID == foodID_input).ash),
                    beta_carotene:  parseFloat(fct.find(element => element.food_ID == foodID_input).beta_carotene),
                    calcium:        parseFloat(fct.find(element => element.food_ID == foodID_input).calcium),
                    carbohydrates:  parseFloat(fct.find(element => element.food_ID == foodID_input).carbohydrates),
                    cholesterol:    parseFloat(fct.find(element => element.food_ID == foodID_input).cholesterol),
                    com_Name:       fct.find(element => element.food_ID == foodID_input).com_Name,
                    edi_Portion:    fct.find(element => element.food_ID == foodID_input).edi_Portion,
                    energy:         parseFloat(fct.find(element => element.food_ID == foodID_input).energy),
                    fiber:          parseFloat(fct.find(element => element.food_ID == foodID_input).fiber),
                    food_ID:        fct.find(element => element.food_ID == foodID_input).food_ID,
                    food_ND:        fct.find(element => element.food_ID == foodID_input).food_ND,
                    iron:           parseFloat(fct.find(element => element.food_ID == foodID_input).iron),
                    niacin:         parseFloat(fct.find(element => element.food_ID == foodID_input).niacin),
                    phosphorus:     parseFloat(fct.find(element => element.food_ID == foodID_input).phosphorus),
                    protein:        parseFloat(fct.find(element => element.food_ID == foodID_input).protein),
                    rae:            parseFloat(fct.find(element => element.food_ID == foodID_input).rae),
                    riboflavin:     parseFloat(fct.find(element => element.food_ID == foodID_input).riboflavin),
                    sci_Name:       fct.find(element => element.food_ID == foodID_input).sci_Name,
                    sodium:         parseFloat(fct.find(element => element.food_ID == foodID_input).sodium),
                    sugars:         parseFloat(fct.find(element => element.food_ID == foodID_input).sugars),
                    thiamin:        parseFloat(fct.find(element => element.food_ID == foodID_input).thiamin),
                    total_fat:      parseFloat(fct.find(element => element.food_ID == foodID_input).total_fat),
                    vit_A:          parseFloat(fct.find(element => element.food_ID == foodID_input).vit_A),
                    vit_C:          parseFloat(fct.find(element => element.food_ID == foodID_input).vit_C),
                    water:          parseFloat(fct.find(element => element.food_ID == foodID_input).water),
                    _id:            fct.find(element => element.food_ID == foodID_input)._id,
                    visible: true
                }
            )
            new_mod_Data = new_mod_Data

            foods_water.push(new_mod_Data[new_mod_Data.length - 1].water)
            foods_water = foods_water
            foods_water_total += foods_water[foods_water.length - 1]
            foods_water_total = foods_water_total

            foods_energy.push(new_mod_Data[new_mod_Data.length - 1].energy)
            foods_energy = foods_energy
            foods_energy_total += foods_energy[foods_energy.length - 1]
            foods_energy_total = foods_energy_total

            foods_protein.push(new_mod_Data[new_mod_Data.length - 1].protein)
            foods_protein = foods_protein
            foods_protein_total += foods_protein[foods_protein.length - 1]
            foods_protein_total = foods_protein_total

            foods_total_fat.push(new_mod_Data[new_mod_Data.length - 1].total_fat)
            foods_total_fat = foods_total_fat
            foods_total_fat_total += foods_total_fat[foods_total_fat.length - 1]
            foods_total_fat_total = foods_total_fat_total

            foods_carbohydrates.push(new_mod_Data[new_mod_Data.length - 1].carbohydrates)
            foods_carbohydrates = foods_carbohydrates
            foods_carbohydrates_total += foods_carbohydrates[foods_carbohydrates.length - 1]
            foods_carbohydrates_total = foods_carbohydrates_total

            foods_ash.push(new_mod_Data[new_mod_Data.length - 1].ash)
            foods_ash = foods_ash
            foods_ash_total += foods_ash[foods_ash.length - 1]
            foods_ash_total = foods_ash_total

            foods_fiber.push(new_mod_Data[new_mod_Data.length - 1].fiber)
            foods_fiber = foods_fiber
            foods_fiber_total += foods_fiber[foods_fiber.length - 1]
            foods_fiber_total = foods_fiber_total

            foods_sugars.push(new_mod_Data[new_mod_Data.length - 1].sugars)
            foods_sugars = foods_sugars
            foods_sugars_total += foods_sugars[foods_sugars.length - 1]
            foods_sugars_total = foods_sugars_total


            food_qtys.push(100)
            food_qtys = food_qtys
        }   

        foodID_input = '';
        
        return json(res)
    }


    async function editFoodItem(index) {
        let temp_water_total = foods_water[index]
        let temp_energy_total = foods_energy[index]
        let temp_protein_total = foods_protein[index]
        let temp_total_fat_total = foods_total_fat[index]
        let temp_carbohydrates_total = foods_carbohydrates[index]
        let temp_ash_total = foods_ash[index]
        let temp_fiber_total = foods_fiber[index]
        let temp_sugars_total = foods_sugars[index]
        


        foods_water_total -= temp_water_total
        foods_water[index] =  parseFloat((fct.find(element => element.food_ID == food_IDs[index]).water) * (food_qtys[index]/100))
        foods_water_total += foods_water[index]
        foods_water_total = foods_water_total

        foods_energy_total -= temp_energy_total
        foods_energy[index] =  parseFloat((fct.find(element => element.food_ID == food_IDs[index]).energy) * (food_qtys[index]/100))
        foods_energy_total += foods_energy[index]
        foods_energy_total = foods_energy_total

        foods_protein_total -= temp_protein_total
        foods_protein[index] =  parseFloat((fct.find(element => element.food_ID == food_IDs[index]).protein) * (food_qtys[index]/100))
        foods_protein_total += foods_protein[index]
        foods_protein_total = foods_protein_total

        foods_total_fat_total -= temp_total_fat_total
        foods_total_fat[index] =  parseFloat((fct.find(element => element.food_ID == food_IDs[index]).total_fat) * (food_qtys[index]/100))
        foods_total_fat_total += foods_total_fat[index]
        foods_total_fat_total = foods_total_fat_total

        foods_carbohydrates_total -= temp_carbohydrates_total
        foods_carbohydrates[index] =  parseFloat((fct.find(element => element.food_ID == food_IDs[index]).carbohydrates) * (food_qtys[index]/100))
        foods_carbohydrates_total += foods_carbohydrates[index]
        foods_carbohydrates_total = foods_carbohydrates_total

        foods_ash_total -= temp_ash_total
        foods_ash[index] =  parseFloat((fct.find(element => element.food_ID == food_IDs[index]).ash) * (food_qtys[index]/100))
        foods_ash_total += foods_ash[index]
        foods_ash_total = foods_ash_total

        foods_fiber_total -= temp_fiber_total
        foods_fiber[index] =  parseFloat((fct.find(element => element.food_ID == food_IDs[index]).fiber) * (food_qtys[index]/100))
        foods_fiber_total += foods_fiber[index]
        foods_fiber_total = foods_fiber_total

        foods_sugars_total -= temp_sugars_total
        foods_sugars[index] =  parseFloat((fct.find(element => element.food_ID == food_IDs[index]).sugars) * (food_qtys[index]/100))
        foods_sugars_total += foods_sugars[index]
        foods_sugars_total = foods_sugars_total

        const res = await fetch('/api/fetch/' + String(data.user) + "/" + String(recipe_index) + "/" + String(index), {
			method: 'PATCH',
			body: JSON.stringify({
                new_qty: food_qtys[index]
			})
		})

        console.log("randy" + String(index))
    }

    async function delFoodItem(index) {
        const res = await fetch('/api/fetch/' + String(data.user) + "/" + String(recipe_index) + '/' + String(index), {
			method: 'DELETE'
		})
        food_Data.splice(index, 1)
        food_Data = food_Data

        mod_food_Data.splice(index, 1)
        mod_food_Data = mod_food_Data

        new_mod_Data.splice(index, 1)
        new_mod_Data = new_mod_Data

        food_qtys.splice(index, 1)
        food_qtys = food_qtys

        foods_water_total -= foods_water[index]
        foods_water_total = foods_water_total
        foods_water.splice(index, 1)
        foods_water = foods_water

        foods_energy_total -= foods_energy[index]
        foods_energy_total = foods_energy_total
        foods_energy.splice(index, 1)
        foods_energy = foods_energy

        foods_protein_total -= foods_protein[index]
        foods_protein_total = foods_protein_total
        foods_protein.splice(index, 1)
        foods_protein = foods_protein

        foods_total_fat_total -= foods_total_fat[index]
        foods_total_fat_total = foods_total_fat_total
        foods_total_fat.splice(index, 1)
        foods_total_fat = foods_total_fat

        foods_carbohydrates_total -= foods_carbohydrates[index]
        foods_carbohydrates_total = foods_carbohydrates_total
        foods_carbohydrates.splice(index, 1)
        foods_carbohydrates = foods_carbohydrates

        foods_ash_total -= foods_ash[index]
        foods_ash_total = foods_ash_total
        foods_ash.splice(index, 1)
        foods_ash = foods_ash

        foods_fiber_total -= foods_fiber[index]
        foods_fiber_total = foods_fiber_total
        foods_fiber.splice(index, 1)
        foods_fiber = foods_fiber

        foods_sugars_total -= foods_sugars[index]
        foods_sugars_total = foods_sugars_total
        foods_sugars.splice(index, 1)
        foods_sugars = foods_sugars

        //for reactive reload
        
        return json(res)
    }


    function visible(index, visible){
        if(!visible){
            foods_water_total           += foods_water          [index]
            foods_energy_total          += foods_energy         [index]
            foods_protein_total         += foods_protein        [index]
            foods_total_fat_total       += foods_total_fat      [index]
            foods_carbohydrates_total   += foods_carbohydrates  [index]
            foods_ash_total             += foods_ash            [index]
            foods_fiber_total           += foods_fiber          [index]
            foods_sugars_total          += foods_sugars         [index]
        }else{
            foods_water_total           -= foods_water          [index]
            foods_energy_total          -= foods_energy         [index]
            foods_protein_total         -= foods_protein        [index]
            foods_total_fat_total       -= foods_total_fat      [index]
            foods_carbohydrates_total   -= foods_carbohydrates  [index]
            foods_ash_total             -= foods_ash            [index]
            foods_fiber_total           -= foods_fiber          [index]
            foods_sugars_total          -= foods_sugars         [index]
        }
    }

    let print = false

    const foodItems = data.fct
    const searchfoodItems = foodItems.map((foodItem) => ({
    ...foodItem,
    searchTerms: `${foodItem.food_ID} ${foodItem.food_ND} ${foodItem.com_Name} ${foodItem.edi_Portion}`
    }));

    const searchStore = createSearchStore(searchfoodItems)
    const unsubscribe = searchStore.subscribe((model) => searchHandler(model));
    onDestroy(() => { unsubscribe();})


    import Chart from "$lib/components/Chart.svelte";
    import { onMount } from 'svelte';

    let chartComponent;

	
    function changeChartData(){
        chartComponent.changeData([
            foods_water_total,
            foods_protein_total,
            foods_total_fat_total,
            foods_carbohydrates_total,
            foods_ash_total,
            foods_fiber_total,
            foods_sugars_total
        ])
    }


</script>

{#if addPopUp}
    <div id="translucent"></div>
    <div id="popUP">
        <div id="panel">
                <div class=" bg-blue-100 col-start-2" id="searchBox">
                    <form class=" row-start-2 flex flex-col">
                        <input type="search" placeholder="Search e.g. 'Fish'" bind:value={$searchStore.search}
                        class="border-slate-500 border-2 rounded bg-slate-50 px-2"/>
                    </form>
                    
                    <div class=" overflow-auto bg-slate-200 h-96 grid row-start-4">
                    
                        {#each $searchStore.filtered as i}
                                {#if food_IDs.includes(i.food_ID)}
                                <div class=" bg-slate-400 m-1 border-black border-2 px-2 flex justify-between">
                                <div>{i.food_ND}, ({i.com_Name})</div>
                                <div>
                                    <button disabled
                                    class=" items-center px-2 py-1 mb-2 text-white bg-slate-500 
                                    rounded-mdsm:w-auto sm:mb-0">
                                        Add
                                    </button>
                                </div>
                                </div>
                                {:else}
                                <div class=" bg-white m-1 border-black border-2 px-2 flex justify-between">
                                <div>{i.food_ND}, ({i.com_Name})</div>
                                <div>
                                    <button
                                    on:click={()=>{
                                        foodID_input = i.food_ID;
                                        addFoodItem();
                                    }}

                                    class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                    rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">
                                        Add
                                    </button>
                                </div>
                                </div>
                                {/if}
                        {/each}
                    
                    </div>

                    <div class=" row-start-6 flex flex-col">

                        <button on:click={() => {addPopUp = false; foodID_input = ''; console.log(foodID_input)}}
                        class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                        rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Done</button>
                    </div>

                    {#if data.isAdmin}
                    <button on:click={() => {console.log(food_IDs)}}
                        class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                        rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">foodIDS - Debug Mode</button>
                    {/if}
                </div>
         </div>
    </div>
{/if}

{#if data.isAdmin}
<div> 
    <button on:click={() => {console.log(new_mod_Data)}}>new_mod_Data</button>
    <button on:click={() => {console.log(mod_food_Data)}}>mod_food_Data</button>
    <button on:click={() => {console.log(food_Data)}}>food_Data</button>
    <button on:click={() => {console.log(food_IDs)}}>food_IDs</button>
    
    <button on:click={() => {console.log(foods_water)}}>show totals</button>
</div>
{/if}

<div id="grid">
    <div id="wrap">
        <div id="container">
            <h1 class=" text-3xl">Recipes List / {recipe_name}</h1>

            <div>
                {#if data.isAdmin}
                    <input bind:value={foodID_input}  class="border-slate-500 border-2 rounded bg-slate-50 px-2"/>

                    <button on:click={addFoodItem} class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                    rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Add</button>
                {/if}

                
                <button on:click={()=>{addPopUp = true}} class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">Add a food Item</button>
                

                <button on:click={() => {is_table_view = !is_table_view;}}
                    class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                    rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">{is_table_view ? "Swith to Chart View" : "Switch to Table View"}</button>
            </div>
            

            {#if food_IDs.length == 0}
            <h1>"{recipe_name}" is Empty</h1>
            {:else}
                {#if is_table_view}
                    <div id="table_box">
                        <table>
                            <tr style="font-weight:bolder; font-size: 0.75rem">
                                <td>Qty (g)</td>
                                <td>food ID</td>
                                <td>Food name and Description</td>
                                <td>Common Name</td>
                                <td>Edible Portion (%)</td>
                                <td>water (g)</td>
                                <td>energy (kcal)</td>
                                <td>protein (g)</td>
                                <td>total_fat (g)</td>
                                <td>carbohydrates (g)</td>
                                <td>ash (g)</td>
                                <td>fiber (g)</td>
                                <td>sugars (g)</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {#each new_mod_Data as data, i}
                                {#if data.visible}
                                    <tr>
                                        <td><input type="number" step=1 style="width:60px" bind:value={food_qtys[i]} on:change={() => {editFoodItem(i); changeChartData();}}/></td>
                                        <td>{data.food_ID}</td>
                                        <td>{data.food_ND}</td>
                                        <td>{data.com_Name}</td>
                                        <td>{data.edi_Portion}</td>
                                        <td>{foods_water[i].toFixed(1)}</td>
                                        <td>{foods_energy[i].toFixed(1)}</td>
                                        <td>{foods_protein[i].toFixed(1)}</td>
                                        <td>{foods_total_fat[i].toFixed(1)}</td>
                                        <td>{foods_carbohydrates[i].toFixed(1)}</td>
                                        <td>{foods_ash[i].toFixed(1)}</td>
                                        <td>{foods_fiber[i].toFixed(1)}</td>
                                        <td>{foods_sugars[i].toFixed(1)}</td>
                                        <td><button on:click={() => {visible(i, data.visible);data.visible = !data.visible; changeChartData();}}
                                            class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">{data.visible ? "on" : "off"}</button></td>

                                        <td><button on:click={() => {goto('/recipes/' + recipe_name + '/' + String(food_IDs[i]))}}
                                            class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">view</button></td>

                                        <td><button on:click={() => {delFoodItem(i); changeChartData();}}
                                            class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">delete</button></td>
                                    </tr>
                                {:else}
                                    <tr id="invis">
                                        <td><input type="number" step=1 style="width:60px" bind:value={food_qtys[i]} on:change={() => {editFoodItem(i); changeChartData();}}/></td>
                                        <td>{data.food_ID}</td>
                                        <td>{data.food_ND}</td>
                                        <td>{data.com_Name}</td>
                                        <td>{data.edi_Portion}</td>
                                        <td>{foods_water[i].toFixed(1)}</td>
                                        <td>{foods_energy[i].toFixed(1)}</td>
                                        <td>{foods_protein[i].toFixed(1)}</td>
                                        <td>{foods_total_fat[i].toFixed(1)}</td>
                                        <td>{foods_carbohydrates[i].toFixed(1)}</td>
                                        <td>{foods_ash[i].toFixed(1)}</td>
                                        <td>{foods_fiber[i].toFixed(1)}</td>
                                        <td>{foods_sugars[i].toFixed(1)}</td>
                                        <td><button on:click={() => {visible(i, data.visible);data.visible = !data.visible; changeChartData();}}
                                            class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">{data.visible ? "on" : "off"}</button></td>

                                        <td><button on:click={() => {goto('/recipes/' + recipe_name + '/' + String(food_IDs[i]))}}
                                            class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">view</button></td>

                                        <td><button on:click={() => {delFoodItem(i); changeChartData();}}
                                            class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">delete</button></td>
                                    </tr>
                                    
                                {/if}
                                
                            {/each}
                                
                            
                        
                            <tr>
                                <td colspan="5">Total</td>
                                <td>{foods_water_total.toFixed(1)}</td>
                                <td>{foods_energy_total.toFixed(1)}</td>
                                <td>{foods_protein_total.toFixed(1)}</td>
                                <td>{foods_total_fat_total.toFixed(1)}</td>
                                <td>{foods_carbohydrates_total.toFixed(1)}</td>
                                <td>{foods_ash_total.toFixed(1)}</td>
                                <td>{foods_fiber_total.toFixed(1)}</td>
                                <td>{foods_sugars_total.toFixed(1)}</td>
                                <td colspan="3"></td>
                            </tr>
                        </table>
                    </div>
                {:else}
                <h1>Chart View</h1>
                <div id="chart_box">
                    <div>
                        <table>
                            <tr style="font-weight:bolder; font-size: 0.75rem">
                                <td>Qty (g)</td>
                                <td>food ID</td>
                                <td>Food name and Description</td>
                                <td>Common Name</td>
                                <td>Edible Portion (%)</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            {#each new_mod_Data as data, i}
                                {#if data.visible}
                                    <tr>
                                        <td><input type="number" step=1 style="width:60px" bind:value={food_qtys[i]} on:change={()=>{editFoodItem(i) ;changeChartData();}}/></td>
                                        <td>{data.food_ID}</td>
                                        <td>{data.food_ND}</td>
                                        <td>{data.com_Name}</td>
                                        <td>{data.edi_Portion}</td>
                                        <td><button on:click={() => {visible(i, data.visible);data.visible = !data.visible; changeChartData();}}
                                            class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">{data.visible ? "on" : "off"}</button></td>

                                        <td><button on:click={() => {goto('/recipes/' + recipe_name + '/' + String(food_IDs[i]))}}
                                            class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">view</button></td>

                                        <td><button on:click={() => {delFoodItem(i); changeChartData();}}
                                            class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">delete</button></td>
                                    </tr>
                                {:else}
                                    <tr id="invis">
                                        <td><input type="number" step=1 style="width:60px" bind:value={food_qtys[i]} on:change={()=>{editFoodItem(i) ;changeChartData();}}/></td>
                                        <td>{data.food_ID}</td>
                                        <td>{data.food_ND}</td>
                                        <td>{data.com_Name}</td>
                                        <td>{data.edi_Portion}</td>
                                        <td><button on:click={() => {visible(i, data.visible);data.visible = !data.visible; changeChartData();}}
                                            class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">{data.visible ? "on" : "off"}</button></td>

                                        <td><button on:click={() => {goto('/recipes/' + recipe_name + '/' + String(food_IDs[i]))}}
                                            class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">view</button></td>

                                        <td><button on:click={() => {delFoodItem(i); changeChartData();}}
                                            class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                                            rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">delete</button></td>
                                    </tr>
                                    
                                {/if}
                                
                            {/each}
                                
                            <tr >
                                <td>Total</td>
                                <td>{foods_water_total.toFixed(1)}</td>
                                <td>{foods_energy_total.toFixed(1)}</td>
                                <td>{foods_protein_total.toFixed(1)}</td>
                                <td>{foods_total_fat_total.toFixed(1)}</td>
                                <td>{foods_carbohydrates_total.toFixed(1)}</td>
                                <td>{foods_ash_total.toFixed(1)}</td>
                                <td>{foods_fiber_total.toFixed(1)}</td>
                                <td>{foods_sugars_total.toFixed(1)}</td>
                            </tr>
                        </table>
                    </div>

                    <button>
                        download
                    </button>
                    
                    <AppPdf bind:print={print}>
                        <Page>
                        <div id="chart" class=" h-80 w-80">
                            <Chart bind:this={chartComponent}
                            water={foods_water_total}
                            protein={foods_protein_total}
                            fat={foods_total_fat_total}
                            carb={foods_carbohydrates_total}
                            ash={foods_ash_total}
                            fiber={foods_fiber_total}
                            sugar={foods_sugars_total}
                            />
                        </div>
                        </Page>
                    </AppPdf>
                    
                    <button on:click={() => {print = true}}>Print</button>
                </div>
                {/if}
            {/if}
            <button on:click={() => {goto('/recipes')}}
                class=" items-center px-2 py-1 mb-2 text-white bg-green-500 
                rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">back</button>
        </div>
    </div>
</div>



<style>
#translucent{
        position: fixed;
        z-index: 1;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;
        background-color: white;
        opacity: 60%;

    }

    #popUP{
        z-index: 5;
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100vh;

        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 0.75fr 3fr 1fr;
    }

    #panel{
        display: grid;
        grid-row-start: 2;
        grid-column-start: 2;

        border-radius: 25px;
        background-color: white;
        border: 4px solid #71C49C;

        flex-direction: row;

        gap: 2px;

        grid-template-columns: 1fr 15fr 1fr;
    } 

    #searchBox{
        display: grid;
    }

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

    table{
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 5px;
        border: 1px solid #71C49C;
        background-color: #71C49C;
        width: 100%;
    }

    td{
        padding: 2px;
        margin: 3px;
        background-color: white;
        border: #71C49C;
        border: 1px solid #71C49C;
    }

    #debug{
        display: none;
    }

    #invis td{
        background-color: gray;
    }

    #table_box{
        overflow-x: auto;
    }

    #chart_box{
        display: flex;
        justify-content:space-evenly;
    }

    #chart{
        margin: 10px;
        border:3px solid #71C49C;
        width: 100%;
    }
</style>
