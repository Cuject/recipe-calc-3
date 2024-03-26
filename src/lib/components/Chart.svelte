<script>
  import { Pie } from 'svelte-chartjs';
  export let water   = 1;
  export let protein = 2;
  export let fat     = 3;
  export let carb    = 4;
  export let ash     = 5;
  export let fiber   = 6;
  export let sugar   = 7;

  let listData = [water, protein, fat, carb, ash, fiber, sugar];


  const data = {
      labels: ['Water', 'Protein', 'Total Fat', 'Carbohydrates', 'Ash', 'Fiber', 'Sugars'],
      datasets: [
          {
          data: listData,
          backgroundColor: [
              '#46BFBD',
              '#F7464A',
              '#FDB45C',
              '#949FB1',
              '#4D5360',
              '#AC64AD',
          ],
          hoverBackgroundColor: [
              '#FF5A5E',
              '#5AD3D1',
              '#FFC870',
              '#A8B3C5',
              '#616774',
              '#DA92DB',
          ],
          
          },
      ],
  };

  export function changeData (list_values) {
      data.datasets[0].data = list_values;
  }

  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale,
  } from 'chart.js';
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

  
</script>

<div>
  <Pie {data} options={{ responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Nutrient Distribution Pie Chart'
        }
  } }} />
</div>

