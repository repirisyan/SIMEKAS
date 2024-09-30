<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

import { Bar } from "vue-chartjs";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
);

const props = defineProps({
    options: Object,
});
</script>

<template>
    <Bar :options="props.options" class="w-full" />
</template>
