<script setup>
import { Link } from "@inertiajs/vue3";

const props = defineProps({
    theads: {
        type: Array,
        default: null,
    },
    empty: {
        type: Boolean,
        default: false,
    },
    current_page: {
        type: Number,
        default: null,
    },
    next_page: {
        type: String,
        default: null,
    },
    prev_page: {
        type: String,
        default: null,
    },
});
</script>

<template>
    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead class="text-black dark:text-white">
                <tr>
                    <th v-for="thead in theads" :key="thead">{{ thead }}</th>
                </tr>
            </thead>
            <tbody class="text-black dark:text-white">
                <!-- row 1 -->
                <tr v-show="empty">
                    <td :colspan="theads.length" class="text-center">
                        Tidak ada data
                    </td>
                </tr>
                <slot name="content" />
            </tbody>
        </table>
    </div>
    <div class="join mt-2 mx-auto">
        <Link
            :href="prev_page"
            class="bg-white text-black dark:text-white hover:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 join-item btn btn-sm"
            v-if="current_page - 1 > 0"
            >«</Link
        >
        <button
            type="button"
            class="bg-white text-black dark:text-white hover:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 join-item btn btn-sm"
        >
            {{ current_page ?? "" }}
        </button>
        <Link
            :href="next_page"
            class="bg-white text-black dark:text-white hover:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 join-item btn btn-sm"
            v-if="next_page != null"
            >»</Link
        >
    </div>
</template>
