<template>
    <div class="pl-12">
        <task-app v-for="task in tasks" :task="task" :key="task.id"></task-app>
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
            colour: 1,
            period: 1
        };
    },
    firestore: {
        tasks: db.collection("tasks").orderBy("update", "desc")
    },
    created() {
        eventBus.$on("selectedColour", data => {
            this.colour = data;
        });
        eventBus.$on("selectedPeriod", data => {
            this.period = data;
        });
    }
};
</script>
