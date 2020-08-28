<template>
    <div
        class="relative w-56 px-4 py-5 mb-6 mr-6 rounded-lg shadow-md group"
        :class="taskColour"
    >
        <button
            id="delete"
            class="absolute top-0 right-0 invisible p-2 group-hover:visible"
            @click="deleteTask(task)"
        >
            <svg
                class="w-5 h-5 text-gray-900 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                    d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                />
            </svg>
        </button>
        <div v-if="!updatingTask">
            <h3 class="title" :class="{ 'line-through': task.completed }">
                {{ task.title }}
            </h3>
            <p class="description">{{ task.description }}</p>
        </div>
        <div v-else>
            <input class="title" type="text" :placeholder="thisTask.title" />
            <input
                class="description"
                type="text"
                :placeholder="thisTask.description"
            />
        </div>
        <button
            id="done"
            class="flex items-center justify-center w-8 h-8 rounded-full"
            :class="[task.completed ? 'bg-white' : 'bg-gray-900']"
            @click="updateStatus(task)"
        >
            <svg
                class="w-6 h-6 text-white fill-current"
                :class="[task.completed ? 'text-gray-900' : 'text-white']"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path
                    d="M9 16.2l-3.5-3.5a.984.984 0 00-1.4 0 .984.984 0 000 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 000-1.4.984.984 0 00-1.4 0L9 16.2z"
                />
            </svg>
        </button>
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
            updatingTask: false,
            colours: ["blue", "green", "yellow"]
        };
    },
    computed: {
        thisTask() {
            return this.task ? this.task : this.defaultTask;
        },
        taskColour() {
            return this.colours[this.task.colour - 1];
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

<style>
.title {
    @apply text-2xl pt-0 mb-2 text-gray-900;
}

.description {
    @apply text-sm font-thin text-gray-900;
}

.blue {
    @apply bg-blue-400;
}

.green {
    @apply bg-green-400;
}

.yellow {
    @apply bg-yellow-400;
}
</style>
