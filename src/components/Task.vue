<template>
    <div class="bg-gray-200">
        <div v-if="!updatingTask">
            <h3>{{ task.title }}</h3>
            <p>{{ task.description }}</p>
        </div>
        <div v-else>
            <input type="text" :placeholder="thisTask.title" />
            <input type="text" :placeholder="thisTask.description" />
        </div>
        <input
            type="checkbox"
            @click="updateStatus(task)"
            :checked="task.completed"
        />
        <button @click="deleteTask(task)">delete</button>
        <button @click="(newTask = { ...task }), (updatingTask = true)">
            update
        </button>
    </div>
</template>

<script>
import firebase from "../firebaseConfig.js";
import { v4 as uuidv4 } from "uuid";

const db = firebase.firestore();

export default {
    name: "Task",
    props: ["task"],
    data() {
        return {
            defaultTask: {
                id: null,
                title: "Title",
                description: "Description",
                completed: false,
                colour: 1,
                period: 1,
                update: null
            },
            updatingTask: false
        };
    },
    computed: {
        thisTask() {
            return this.task ? this.task : this.defaultTask;
        }
    },
    methods: {
        addNewTask() {
            this.newTask.id = uuidv4();
            this.newTask.update = Date.now();
            console.log(this.newTask);

            if (Object.values(this.newTask).every(value => value !== null)) {
                db.collection("tasks")
                    .doc(this.newTask.id)
                    .set(this.newTask)
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
            }
            this.resetForm();
        },
        updateTask() {
            this.newTask.update = Date.now();
            db.collection("tasks")
                .doc(this.newTask.id)
                .update(this.newTask)
                .then(function() {
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
            this.resetForm();
        },
        updateStatus(task) {
            const newStatus = !task.completed;
            db.collection("tasks")
                .doc(task.id)
                .update({ completed: newStatus })
                .then(function() {
                    console.log("Document successfully updated!");
                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        },
        deleteTask(task) {
            db.collection("tasks")
                .doc(task.id)
                .delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                })
                .catch(function(error) {
                    console.error("Error removing document: ", error);
                });
        },
        resetForm() {
            for (let key in this.newTask) {
                const resetKeys = ["title", "description", "update"];
                if (resetKeys.includes(key)) {
                    this.newTask[key] = null;
                }
            }
            this.newTask.completed = false;
            this.updatingTask = false;
        }
    }
};
</script>
