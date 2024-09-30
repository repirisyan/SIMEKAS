<script setup>
const props = defineProps({
    title: String,
    value: String | Number,
    desc: Number,
});
</script>

<template>
    <div class="stats shadow bg-white dark:bg-gray-800 dark:text-white">
        <div class="stat">
            <div class="stat-title text-black dark:text-white">
                {{ props.title }}
            </div>
            <div class="stat-value text-black dark:text-white">
                {{ props.value }}
            </div>
            <div class="stat-desc text-black dark:text-white">
                {{ props.desc }}
            </div>
        </div>
    </div>
</template>
