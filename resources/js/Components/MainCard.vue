<script setup>
defineProps({
    title: String,
    value: String,
    desc: String,
});
</script>

<template>
    <div class="stats shadow bg-white dark:bg-gray-800 dark:text-white">
        <div class="stat">
            <div class="stat-title text-black dark:text-white">{{ title }}</div>
            <div class="stat-value text-black dark:text-white">{{ value }}</div>
            <div class="stat-desc text-black dark:text-white">{{ desc }}</div>
        </div>
    </div>
</template>
