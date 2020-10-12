<template>
    <div class="pr-8">
        <h3 class="flex justify-end text-3xl">{{ title }}</h3>
        <p class="flex justify-end text-3xl font-hairline">
            {{ completedTaskNum }} / {{ taskCount }}
        </p>
    </div>
</template>

<script>
export default {
    name: "TaskHabitCount",
    props: ["title", "completedTaskNum", "taskCount"]
};
</script>
