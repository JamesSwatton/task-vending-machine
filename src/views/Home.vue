<template>
    <div class="h-screen">
        <div class="inline-flex">
            <add-task-app></add-task-app>
            <div class="pl-20 overflow-auto">
                <period-select-app></period-select-app>
                <tasks-app></tasks-app>
                <div
                    id="overflow-gradient"
                    class="fixed bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent"
                ></div>
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
