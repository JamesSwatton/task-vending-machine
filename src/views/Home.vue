<template>
    <div class="h-screen">
        <div class="flex">
            <tasks-app class="flex-grow w-1/3 min-w-0"></tasks-app>
            <habits-app></habits-app>
        </div>
    </div>
</template>

<script>
import Tasks from "../components/Tasks";
import Habits from "../components/Habits";

export default {
    name: "Tasks",
    components: {
        "tasks-app": Tasks,
        "habits-app": Habits
    }
};
</script>
