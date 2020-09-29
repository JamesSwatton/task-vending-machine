<template>
    <div
        class="fixed inline-flex flex-col items-center w-20 h-screen pt-20 bg-white border-r border-gray-300"
    >
        <btn-add-app class="mb-6" @click.native="addNewTask"></btn-add-app>
        <div id="colour-select">
            <div
                class="btn-container"
                :class="{ 'border border-gray-800': selected === 1 }"
            >
                <button
                    class="bg-blue-400 rnd-btn hover:bg-blue-500"
                    id="blue"
                    value="1"
                    @click="changeColour($event)"
                ></button>
            </div>
            <div
                class="btn-container"
                :class="{ 'border border-gray-800': selected === 2 }"
            >
                <button
                    class="bg-green-400 rnd-btn hover:bg-green-500"
                    id="blue"
                    value="2"
                    @click="changeColour($event)"
                ></button>
            </div>
            <div
                class="btn-container"
                :class="{ 'border border-gray-800': selected === 3 }"
            >
                <button
                    class="bg-yellow-400 rnd-btn hover:bg-yellow-500"
                    id="blue"
                    value="3"
                    @click="changeColour($event)"
                ></button>
            </div>
        </div>
        <btn-delete-app
            class="mt-6"
            @click.native="deleteCompletedTasks"
        ></btn-delete-app>
    </div>
</template>

<script>
import BtnDeleteAll from "./buttons/BtnDeleteAll.vue";
import BtnAdd from "./buttons/BtnAdd.vue";
import firebase from "../firebaseConfig.js";
import { eventBus } from "../main";

const db = firebase.firestore();

export default {
    name: "AddTask",
    components: {
        "btn-delete-app": BtnDeleteAll,
        "btn-add-app": BtnAdd
    },
    data() {
        return {
            clicked: false,
            selected: 1,
            defaultTask: {
                title: "Title",
                description: "Description",
                completed: false,
                colour: 1,
                period: null,
                update: null
            },
            selectedPeriod: 1
        };
    },
    created() {
        eventBus.$on("selectedPeriod", data => {
            this.selectedPeriod = data;
        });
        this.defaultTask.period = this.selectedPeriod;
    },
    watch: {
        selectedPeriod() {
            this.defaultTask.period = this.selectedPeriod;
        }
    },
    methods: {
        changeColour(event) {
            this.selected = parseInt(event.target.value);
            this.defaultTask.colour = parseInt(event.target.value);
        },
        addNewTask() {
            this.defaultTask.update = Date.now();
            db.collection("tasks")
                .add(this.defaultTask)
                .then(function(docRef) {
                    console.log("Document successfully written!");
                    eventBus.$emit("recentlyAddedTask", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                    eventBus.$emit("recentlyAdded", null);
                });
        },
        deleteCompletedTasks() {
            const taskQuery = db
                .collection("tasks")
                .where("period", "==", this.selectedPeriod)
                .where("completed", "==", true);

            taskQuery
                .get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        doc.ref.delete();
                    });
                })
                .then(function() {
                    console.log("Documents successfully deleted!");
                });
        }
    }
};
</script>

<style scoped>
.rnd-btn {
    @apply block rounded-full w-5 h-5;
}

.btn-container {
    @apply flex items-center justify-center w-8 h-8 mb-1 rounded-full;
}
</style>
