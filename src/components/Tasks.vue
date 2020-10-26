<template>
    <div id="tasks" class="flex-grow">
        <sidebar-app>
            <add-task-app></add-task-app>
        </sidebar-app>
        <div class="pl-20 overflow-auto">
            <div class="flex justify-between">
                <token-count-app></token-count-app>
                <task-count-app
                    title="Tasks"
                    :completed="completedTasksNum"
                    :count="taskCount"
                    justify="end"
                ></task-count-app>
            </div>
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
import SideBar from "./SideBar";
import PeriodSelect from "./PeriodSelect";
import TaskHabitCount from "./TaskHabitCount";
import TokenCount from "./TokenCount";
import { eventBus } from "../main";

const db = firebase.firestore();

export default {
    name: "Tasks",
    components: {
        "task-list-app": TaskList,
        "sidebar-app": SideBar,
        "add-task-app": AddTask,
        "period-select-app": PeriodSelect,
        "task-count-app": TaskHabitCount,
        "token-count-app": TokenCount
    },
    data() {
        return {
            tasks: [],
            allTasks: [],
            selectedPeriod: 1
        };
    },
    computed: {
        completedTasksNum() {
            var completed = 0;
            this.allTasks.forEach(task => {
                if (task.completed) {
                    completed++;
                }
            });

            eventBus.$emit("completedTasksNum", completed);

            return completed;
        },
        taskCount() {
            return this.allTasks.length;
        }
    },
    created() {
        eventBus.$on("selectedPeriod", data => {
            this.selectedPeriod = data;
        });

        const userId = firebase.auth().currentUser.uid;
        this.$bind(
            "tasks",
            db
                .collection("users")
                .doc(userId)
                .collection("tasks")
                .orderBy("createdAt", "desc")
                .where("period", "==", this.selectedPeriod)
        );
        this.$bind(
            "allTasks",
            db
                .collection("users")
                .doc(userId)
                .collection("tasks")
        );
    },
    watch: {
        selectedPeriod: {
            immediate: true,
            handler(selectedPeriod) {
                this.$bind(
                    "tasks",
                    db
                        .collection("users")
                        .doc(firebase.auth().currentUser.uid)
                        .collection("tasks")
                        .orderBy("createdAt", "desc")
                        .where("period", "==", selectedPeriod)
                );
            }
        }
    }
};
</script>
