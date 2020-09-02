<template>
    <div class="flex flex-wrap items-start pl-12 pb-8">
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
const allTasks = db.collection("tasks");

export default {
    name: "Tasks",
    components: {
        "task-app": Task
    },
    data() {
        return {
            tasks: [],
            recentelyAdded: null,
            selectedPeriod: 1
        };
    },
    firestore: {
        tasks: allTasks.orderBy("update", "desc")
    },
    created() {
        eventBus.$on("recentelyAdded", data => {
            this.recentelyAdded = data;
        });
        eventBus.$on("selectedPeriod", data => {
            this.selectedPeriod = data;
        });
    },
    watch: {
        selectedPeriod: {
            immediate: true,
            handler(selectedPeriod) {
                this.$bind(
                    "tasks",
                    allTasks.where("period", "==", selectedPeriod)
                );
            }
        }
    }
};
</script>
