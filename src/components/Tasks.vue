<template>
    <div class="flex flex-wrap items-start pl-12">
        <task-app
            v-for="task in tasks"
            :task="task"
            :recentelyAdded="recentelyAdded"
            :key="task.id"
        ></task-app>
    </div>
</template>

<script>
import firebase from "../firebaseConfig.js";
import Task from "../components/Task";
import { eventBus } from "../main";

const db = firebase.firestore();

export default {
    name: "Tasks",
    components: {
        "task-app": Task
    },
    data() {
        return {
            tasks: [],
            recentelyAdded: null
        };
    },
    firestore: {
        tasks: db.collection("tasks").orderBy("update", "desc")
    },
    created() {
        eventBus.$on("recentelyAdded", data => {
            this.recentelyAdded = data;
        });
    }
};
</script>
