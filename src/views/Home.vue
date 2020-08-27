<template>
    <div>
        <div class="flex">
            <add-task-app></add-task-app>
            <div>
                <period-select-app></period-select-app>
                <tasks-app></tasks-app>
            </div>
        </div>
    </div>
</template>

<script>
import AddTask from "../components/AddTask";
import PeriodSelect from "../components/PeriodSelect";
import Tasks from "../components/Tasks";

export default {
    name: "Tasks",
    components: {
        "add-task-app": AddTask,
        "period-select-app": PeriodSelect,
        "tasks-app": Tasks
    }
};
</script>
