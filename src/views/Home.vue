<template>
    <div>
        <add-task-app
            class="fixed flex flex-col items-center float-left w-20 h-screen pt-20 bg-white border-r-2 border-gray-300"
            @selectedColour="colour = $event"
        ></add-task-app>
        <period-select-app
            class="fixed pt-16 pl-6"
            @selectedPeriod="period = $event"
        ></period-select-app>
        <tasks-app></tasks-app>
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
    },
    data() {
        return {
            newTask: false,
            colour: 1,
            period: 1
        };
    }
};
</script>
