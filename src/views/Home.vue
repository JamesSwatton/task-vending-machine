<template>
    <div>
        <add-task-app
            class="fixed flex flex-col items-center float-left w-20 h-screen pt-20 bg-white border-r-2 border-gray-300"
        ></add-task-app>
        <period-select-app class="fixed pt-20 pl-6 ml-20"></period-select-app>
        <task-app v-for="task in tasks" :task="task" :key="task.id"></task-app>
    </div>
</template>

<script>
import firebase from "../firebaseConfig.js";
import AddTask from "../components/AddTask";
import PeriodSelect from "../components/PeriodSelect";
import Task from "../components/Task.vue";

const db = firebase.firestore();

export default {
    name: "Tasks",
    components: {
        "task-app": Task,
        "add-task-app": AddTask,
        "period-select-app": PeriodSelect
    },
    data() {
        return {
            tasks: [],
            newTask: false
        };
    },
    firestore: {
        tasks: db.collection("tasks").orderBy("update", "desc")
    }
};
</script>
