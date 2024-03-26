<script>
  import Chart from "$lib/components/Chart.svelte";


  let chartComponent;
  let changeChartData;

  changeChartData = function(){
    chartComponent.changeData([
      Math.floor(Math.random() * 10) + 1,
      Math.floor(Math.random() * 10) + 1,
      Math.floor(Math.random() * 10) + 1,
      Math.floor(Math.random() * 10) + 1,
    ])
  }
</script>

<div class=" h-80 w-80">
  <Chart bind:this={chartComponent}/>
</div>


<button on:click={changeChartData}>Randomizeeee</button>
