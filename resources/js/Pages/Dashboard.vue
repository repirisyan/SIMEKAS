<script setup>
import AppLayout from "@/Layouts/AppLayout.vue";
import MainCard from "@/Components/MainCard.vue";

const props = defineProps({
    saldo: Number,
    pemasukan: Number,
    pengeluaran: Number,
    client: Number,
    project: Number,
});

const date = new Date().getFullYear();
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
                    :value="
                        new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                        }).format(props.saldo)
                    "
                ></MainCard>
                <MainCard
                    :title="'Pemasukan'"
                    :value="
                        new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                        }).format(props.pemasukan)
                    "
                    :desc="date"
                ></MainCard>
                <MainCard
                    :title="'Pengeluaran'"
                    :value="
                        new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                        }).format(props.pengeluaran)
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
        </div>
    </AppLayout>
</template>
