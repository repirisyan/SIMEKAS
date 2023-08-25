<script>
  import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Line } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'LineChart',
  components: { Line },
  computed: {
    myStyles () {
      return {
        height: `300px`,
      }
    }
  },
  data() {
    return
  }
}
</script>

<template>
  <Line :data="data" :options="options" :style="myStyles" />
</template>