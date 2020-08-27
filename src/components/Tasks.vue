<template>
    <div>
        <task-app v-for="task in tasks" :task="task" :key="task.id"></task-app>
    </div>
</template>

<script>
import firebase from "../firebaseConfig.js";
import Task from "../components/Task";

const db = firebase.firestore();

export default {
    name: "Tasks",
    components: {
        "task-app": Task
    },
    data() {
        return {
            tasks: []
        };
    },
    firestore: {
        tasks: db.collection("tasks").orderBy("update", "desc")
    }
};
</script>
