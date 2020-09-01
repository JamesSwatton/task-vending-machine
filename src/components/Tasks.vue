<template>
    <div class="flex flex-wrap items-start pl-12">
        <task-app
            v-if="newTask"
            :task="defaultTask"
            :updatingTask="true"
        ></task-app>
        <task-app
            v-for="task in tasks"
            :task="task"
            :updatingTask="false"
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
            newTask: false,
            defaultTask: {
                id: null,
                title: "Title",
                description: "Description",
                completed: false,
                colour: 1,
                period: 1,
                update: null
            }
        };
    },
    firestore: {
        tasks: db.collection("tasks").orderBy("update", "desc")
    },
    created() {
        eventBus.$on("newTask", data => {
            console.log(data);
            this.newTask = data;
        });
        eventBus.$on("selectedColour", data => {
            this.defaultTask.colour = data;
        });
        eventBus.$on("selectedPeriod", data => {
            this.defaultTask.period = data;
        });
    }
};
</script>
