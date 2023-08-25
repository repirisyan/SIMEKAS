<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import MainCard from "@/Components/MainCard.vue";
import LineChart from "@/Components/LineChart.vue";

const props = defineProps({
    saldo: Number,
    pemasukan: Number,
    pengeluaran: Number,
    client: Number,
    project: Number,
    chart: Object
});
const date = new Date().getFullYear();

let data_pemasukan = [];
let data_pengeluaran = [];
let labels = [];

props.chart.forEach((element) => {
    if (!labels.includes(element.years)) {
        labels.push(element.years);
    }
    if (element.type == '1') {
        data_pemasukan.push(element.data)
    }else{
        data_pengeluaran.push(element.data)
    }
});

const chartData = {
    labels: labels,
    datasets: [
               {
                 label: 'Pemasukan',
                 backgroundColor: '#32cd32',
                 data: data_pemasukan
               },
               {
                 label: 'Pengeluaran',
                 backgroundColor: '#fa8072',
                 data: data_pengeluaran
               }
            ],
    chartOptions: {
         responsive: true,
         maintainAspectRatio: false
    }
}
</script>

<template>
    <AppLayout title="Dashboard">
        <template #header>
            <h2
                class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight"
            >
                Dashboard
            </h2>
        </template>

        <div class="p-12 text-center">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <MainCard
                    :title="'Saldo'"
                    :value="'Rp.'+
                        new Intl.NumberFormat('id-ID').format(props.saldo)
                    "
                ></MainCard>
                <MainCard
                    :title="'Pemasukan'"
                    :value="'Rp.'+
                        new Intl.NumberFormat('id-ID').format(props.pemasukan)
                    "
                    :desc="date"
                ></MainCard>
                <MainCard
                    :title="'Pengeluaran'"
                    :value="'Rp.'+
                        new Intl.NumberFormat('id-ID').format(props.pengeluaran)
                    "
                    :desc="date"
                ></MainCard>
            </div>
            <div class="grid grid-cols-1 mt-4 sm:grid-cols-2 gap-4">
                <MainCard
                    :title="'Jumlah Client'"
                    :value="props.client"
                ></MainCard>
                <MainCard
                    :title="'Jumlah Project'"
                    :value="props.project"
                ></MainCard>
            </div>
                <div class="stats mt-4 shadow bg-white dark:bg-gray-800 dark:text-white">
                <div class="stat">
                      <LineChart :data="chartData" />
                </div>
             </div>
        </div>
    </AppLayout>
</template>
