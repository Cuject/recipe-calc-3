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

<div class=" h-80 w-80">
  <Chart bind:this={chartComponent}/>
</div>


<button on:click={()=>{changeChartData()}}>Randomizeeee</button>


