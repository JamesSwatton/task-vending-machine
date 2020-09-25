<template>
    <div class="flex flex-wrap items-start pb-8 pl-12">
        <task-app
            v-for="task in tasks"
            :task="task"
            :recentlyAdded="recentlyAdded"
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
            recentlyAdded: null,
            selectedPeriod: 1
        };
    },
    created() {
        this.$bind(
            "tasks",
            db.collection("tasks").where("period", "==", this.selectedPeriod)
        );
        eventBus.$on("recentlyAdded", data => {
            this.recentlyAdded = data;
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
                    db.collection("tasks").where("period", "==", selectedPeriod)
                );
            }
        }
    }
};
</script>
