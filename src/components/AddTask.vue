<template>
    <div
        class="fixed inline-flex flex-col items-center w-20 h-screen pt-20 bg-white border-r border-gray-300"
    >
        <btn-add-app></btn-add-app>
        <div id="colour-select">
            <div
                class="btn-container"
                :class="{ 'border border-gray-900': selected === 1 }"
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
                :class="{ 'border border-gray-900': selected === 2 }"
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
                :class="{ 'border border-gray-900': selected === 3 }"
            >
                <button
                    class="bg-yellow-400 rnd-btn hover:bg-yellow-500"
                    id="blue"
                    value="3"
                    @click="changeColour($event)"
                ></button>
            </div>
        </div>
        <btn-delete-app></btn-delete-app>
    </div>
</template>

<script>
import BtnDeleteAll from "./buttons/BtnDeleteAll.vue";
import BtnAdd from "./buttons/BtnAdd.vue";
import firebase from "../firebaseConfig.js";
import { v4 as uuidv4 } from "uuid";
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
            selected: 1,
            defaultTask: {
                id: null,
                title: "Title",
                description: "Description",
                completed: false,
                colour: 1,
                period: 1,
                update: null
            }
        };
    },
    created() {
        eventBus.$on("selectedPeriod", data => {
            this.defaultTask.period = data;
        });
    },
    methods: {
        changeColour(event) {
            this.selected = parseInt(event.target.value);
            this.defaultTask.colour = parseInt(event.target.value);
        },
        addNewTask() {
            this.defaultTask.id = uuidv4();
            this.defaultTask.update = Date.now();

            const self = this;

            if (
                Object.values(this.defaultTask).every(value => value !== null)
            ) {
                eventBus.$emit("recentelyAdded", self.defaultTask.id);

                db.collection("tasks")
                    .doc(this.defaultTask.id)
                    .set(this.defaultTask)
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                        eventBus.$emit("recentelyAdded", null);
                    });
            }
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
