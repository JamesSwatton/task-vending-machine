<template>
    <div>
        <h1>Tasks</h1>
        <button @click="resetForm()">New task</button>
        <form>
            <input type="text" v-model="newTask.title" /> Title
            <br />
            <input type="text" v-model="newTask.description" /> Description
            <br />
            <h4>Colour</h4>
            <input
                type="radio"
                name="colour"
                value="1"
                v-model.number="newTask.colour"
            />
            Blue
            <input
                type="radio"
                name="colour"
                value="2"
                v-model.number="newTask.colour"
            />
            Green
            <input
                type="radio"
                name="colour"
                value="3"
                v-model.number="newTask.colour"
            />
            Yellow
            <br />
            <h4>Period</h4>
            <input
                type="radio"
                name="period"
                value="1"
                v-model.number="newTask.period"
            />
            Today
            <input
                type="radio"
                name="period"
                value="2"
                v-model.number="newTask.period"
            />
            This week
            <input
                type="radio"
                name="period"
                value="3"
                v-model.number="newTask.period"
            />
            This month
            <br />
            <button v-if="!updatingTask" @click.prevent="addNewTask">
                Add task
            </button>
            <button v-else @click.prevent="updateTask">Update task</button>
        </form>
        <section v-for="task in tasks" :key="task.title">
            <h3>{{ task.title }}</h3>
            <p>{{ task.description }}</p>
            <input
                type="checkbox"
                @click="updateStatus(task)"
                :checked="task.completed"
            />
            <button @click="deleteTask(task)">delete</button>
            <button @click="(newTask = { ...task }), (updatingTask = true)">
                update
            </button>
        </section>
    </div>
</template>

<script>
import firebase from "../firebaseConfig.js";
import { v4 as uuidv4 } from "uuid";

const db = firebase.firestore();

export default {
    name: "Tasks",
    data() {
        return {
            tasks: [],
            newTask: {
                id: null,
                title: null,
                description: null,
                completed: false,
                colour: 1,
                period: 1,
                update: null
            },
            updatingTask: false
        };
    },
    firestore: {
        tasks: db.collection("tasks")
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
    },
    created() {
        // this unbinds any previously bound reference
        this.$bind("tasks", db.collection("tasks")).then(tasks => {
            this.tasks === tasks;
            // tasks are ready to be used
            // if it contained any reference to other document or collection, the
            // promise will wait for those references to be fetched as well

            // you can unbind a property anytime you want
            // this will be done automatically when the component is destroyed
            //this.$unbind("tasks");
        });
    }
};
</script>
