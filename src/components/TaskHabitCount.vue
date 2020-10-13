<template>
    <div class="px-8 pt-4">
        <h3 class="flex text-3xl" :class="justify">{{ title }}</h3>
        <p class="flex text-3xl font-hairline" :class="justify">
            {{ completed }} / {{ count }}
        </p>
    </div>
</template>

<script>
export default {
    name: "TaskHabitCount",
    props: ["title", "completed", "count", "justify"]
};
</script>

<style scoped>
.start {
    @apply justify-start;
}

.end {
    @apply justify-end;
}
</style>
