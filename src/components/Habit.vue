<template>
    <div>
        <div id="task-count" class="bg-blue-400 rounded-full">
            <p>{{ defaultHabit.count }} / {{ defaultHabit.max }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Habit",
    data() {
        return {
            defaultHabit: {
                title: "Title",
                frequency: 0,
                count: 0,
                max: 1,
                id: null,
                updatedAt: null
            }
        };
    }
};
</script>
