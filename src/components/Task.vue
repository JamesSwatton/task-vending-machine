<template>
    <div
        class="relative w-56 h-auto px-4 py-5 mb-6 mr-6 rounded-lg shadow-none group transition duration-200 ease-in-out hover:shadow-xl"
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
            <input
                type="text"
                ref="taskInput"
                class="w-full bg-transparent border-b-2 border-transparent box-border focus:border-gray-900 title focus:outline-none"
                v-model="taskCopy.title"
            />
            <input
                type="text"
                class="w-full bg-transparent border-b-2 border-transparent box-border focus:border-gray-900 description focus:outline-none"
                v-model="taskCopy.description"
            />
        </div>
        <div id="edit" class="flex justify-end mt-2" v-if="task.id">
            <button
                id="update"
                class="flex items-center justify-center w-8 h-8 rounded-full"
                :class="[updatingTask ? 'bg-white' : 'bg-gray-900']"
                @click="updateTask"
            >
                <svg
                    class="w-5 h-5 fill-current"
                    :class="[updatingTask ? 'text-gray-900' : 'text-white']"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    />
                </svg>
            </button>
            <button
                id="done"
                class="flex items-center justify-center w-8 h-8 mx-1 rounded-full"
                :class="[task.completed ? 'bg-white' : 'bg-gray-900']"
                @click="updateStatus(task)"
                v-if="!updatingTask"
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
        </div>
        <div id="add" class="flex justify-end mt-2" v-else>
            <button
                class="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-full"
                @click="addNewTask"
            >
                <svg
                    class="w-6 h-6 text-white fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import firebase from "../firebaseConfig.js";
import { v4 as uuidv4 } from "uuid";
import { eventBus } from "../main";

const db = firebase.firestore();

export default {
    name: "Task",
    props: ["task", "updatingTask"],
    data() {
        return {
            taskCopy: {},
            colours: ["blue", "green", "yellow"]
        };
    },
    computed: {
        taskColour() {
            return this.colours[this.task.colour - 1];
        }
    },
    created() {
        this.taskCopy = { ...this.task };
    },
    mounted() {
        if (this.updatingTask) {
            console.log("hello");
            this.$refs.taskInput.focus();
        }
    },
    methods: {
        addNewTask() {
            this.taskCopy.id = uuidv4();
            this.taskCopy.update = Date.now();
            console.log(this.taskCopy);

            if (Object.values(this.taskCopy).every(value => value !== null)) {
                db.collection("tasks")
                    .doc(this.taskCopy.id)
                    .set(this.taskCopy)
                    .then(function() {
                        console.log("Document successfully written!");
                        eventBus.$emit("newTask", false);
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
            }
        },
        updateTask() {
            if (this.updatingTask) {
                this.taskCopy.update = Date.now();
                db.collection("tasks")
                    .doc(this.taskCopy.id)
                    .update(this.taskCopy)
                    .then(function() {
                        console.log("Document successfully updated!");
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            }
            this.updatingTask = !this.updatingTask;
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
