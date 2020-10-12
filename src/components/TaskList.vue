<template>
    <div class="flex flex-wrap items-start pb-8 pl-12">
        <task-app
            v-for="task in tasks"
            :task="task"
            :recentlyAddedId="recentlyAddedId"
            :id="task.id"
            :key="task.id"
        ></task-app>
    </div>
</template>

<script>
import Task from "./Task";
import { eventBus } from "../main";

export default {
    name: "TaskList",
    props: ["tasks"],
    components: {
        "task-app": Task
    },
    data() {
        return {
            recentlyAddedId: null
        };
    },
    created() {
        eventBus.$on("recentlyAddedTask", data => {
            this.recentlyAddedId = data;
        });
    }
};
</script>
