<script>
    import Chart from "$lib/components/Chart.svelte";
    import AppPdf from "$lib/components/AppPdf.svelte";
    import Page from "$lib/components/Page.svelte";

    let chartComponent;
    let isDownload = false
  
    function changeChartData(){
      chartComponent.changeData([
        Math.floor(Math.random() * 10) + 1,
        Math.floor(Math.random() * 10) + 1,
        Math.floor(Math.random() * 10) + 1,
        Math.floor(Math.random() * 10) + 1,
      ])
    }
  
    let print = false;
  </script>
  

  
<div class=" grid grid-cols-3 grid-rows-3">
    <button on:click={()=>{isDownload = true}} class=" row-start-1 col-start-2">Document</button>
    {#if isDownload}
    <AppPdf bind:print={print}>
        <div id="document" class=" row-start-2 col-start-2">
            <div class=" h-80 w-80 border-black border-">
                <Chart bind:this={chartComponent}/>
            </div>
        </div>
    </AppPdf>
    <button on:click={() => {print = true}} class=" row-start-1 col-start-3">Print</button>
  {/if}
</div>
  
  <style>
    #document{
      background-color: white;
      height: 707px;
      width: 500px;
    }
  </style>