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
            recentlyAddedId: null,
            selectedPeriod: 1
        };
    },
    firestore: {
        tasks: db
            .collection("tasks")
            .orderBy("update", "desc")
            .where("period", "==", 1)
    },
    created() {
        eventBus.$on("recentlyAddedTask", data => {
            this.recentlyAddedId = data;
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
                    db
                        .collection("tasks")
                        .orderBy("update", "desc")
                        .where("period", "==", selectedPeriod)
                );
            }
        }
    }
};
</script>
