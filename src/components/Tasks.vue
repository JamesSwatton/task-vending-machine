<template>
    <div id="tasks">
        <add-task-app></add-task-app>
        <div class="pl-20 overflow-auto">
            <task-count-app
                title="Tasks"
                :completed="completedTaskNum"
                :count="taskCount"
                justify="end"
            ></task-count-app>
            <period-select-app></period-select-app>
            <task-list-app :tasks="tasks"></task-list-app>
            <div
                id="overflow-gradient"
                class="fixed bottom-0 w-full h-24 bg-gradient-to-t from-white to-transparent"
            ></div>
        </div>
    </div>
</template>

<script>
import firebase from "../firebaseConfig.js";
import TaskList from "./TaskList.vue";
import AddTask from "./AddTask";
import PeriodSelect from "./PeriodSelect";
import TaskHabitCount from "./TaskHabitCount";
import { eventBus } from "../main";

const db = firebase.firestore();

export default {
    name: "Tasks",
    components: {
        "task-list-app": TaskList,
        "add-task-app": AddTask,
        "period-select-app": PeriodSelect,
        "task-count-app": TaskHabitCount
    },
    data() {
        return {
            tasks: [],
            selectedPeriod: 1
        };
    },
    firestore: {
        tasks: db
            .collection("tasks")
            .orderBy("createdAt", "desc")
            .where("period", "==", 1)
    },
    computed: {
        completedTaskNum() {
            var completed = 0;
            this.tasks.forEach(task => {
                if (task.completed) {
                    completed++;
                }
            });
            console.log(completed);
            return completed;
        },
        taskCount() {
            return this.tasks.length;
        }
    },
    created() {
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
                        .orderBy("createdAt", "desc")
                        .where("period", "==", selectedPeriod)
                );
            }
        }
    }
};
</script>
