<!--laura set up bar component based on the module 10 code-->
<template>
  <canvas ref="myChart"></canvas> 
</template>

<script>
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables);
export default {
  props: {
    label: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
  },
  async mounted() {
    console.log(this.chartData);
    await new Chart(this.$refs.myChart, {
      type: "bar",
      data: {
        labels: this.label,
        datasets: [
          {
            label: "EventAttendees",
            backgroundColor: "rgba(144,238,144 , 0.9 )",
            data: this.chartData,
          },
        ],
      },
      options: {
        scales: {
            y: {
                min: 0,
                max: 10
            }
        }
      }
    });
  },
};
</script>