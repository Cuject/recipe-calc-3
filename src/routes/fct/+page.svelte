<script>
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    
    export let data;
    
    
    </script>
    
    <div id="grid">
        <div id="wrap">
            <div id="container">
                <h1>"Food Composition Tables"</h1>

                <button on:click={() => {goto('/recipes')}}
                    class=" items-center px-6 py-3 mb-2 text-white bg-green-500 
                    rounded-md hover:bg-green-400 sm:w-auto sm:mb-0">back to recipes</button>
    
                <table>
                    <tr style="font-weight:bolder">
                        <td>no.</td>
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
                    </tr>
                    {#each data.fct as data, i}
                    <tr>
                        <td>{i + 1}</td>
                        <td>{data.food_ID}</td>
                        <td>{data.food_ND}</td>
                        <td>{data.com_Name}</td>
                        <td>{data.edi_Portion}</td>
                        <td>{data.water}</td>
                        <td>{data.energy}</td>
                        <td>{data.protein}</td>
                        <td>{data.total_fat}</td>
                        <td>{data.carbohydrates}</td>
                        <td>{data.ash}</td>
                        <td>{data.fiber}</td>
                        <td>{data.sugars}</td>
                    </tr>
                    {/each}
                </table>
            </div>
        </div>
    </div>
    
    
    
    <style>
    #grid{
        margin: 50px;
        }
    
        #wrap{
            border: 5px solid white;
            border-radius: 25px;
            padding: 4px;
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
            background-color: #71C49C;
            width: 100%;
            overflow-y: auto;
                
        }
    
        td{
            background-color: white;
        }
    
    </style>