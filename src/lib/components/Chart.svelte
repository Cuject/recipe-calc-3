<script>
    import { Pie } from 'svelte-chartjs';
    export let water  ;
    export let protein;
    export let fat    ;
    export let carb   ;
    export let ash    ;
    export let fiber  ;
    export let sugar  ;


    const data = {
        labels: ['Water', 'Protein', 'Total Fat', 'Carbohydrates', 'Ash', 'Fiber', 'Sugars'],
        datasets: [
            {
            data: [water, protein, fat, carb, ash, fiber, sugar],
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


<style>
  div{
    height: 200px;
  }
</style>