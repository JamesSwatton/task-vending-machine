<template>
    <div>
        <button
            class="flex items-center justify-center w-6 h-6 mt-6"
            @click="deleteCompletedTasks"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-gray-800 fill-current"
                viewBox="0 0 24 24"
            >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                    d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z"
                />
            </svg>
        </button>
    </div>
</template>

<script>
import firebase from "../../firebaseConfig.js";
import { eventBus } from "../../main";

const db = firebase.firestore();

export default {
    data() {
        return {
            selectedPeriod: 1
        };
    },
    created() {
        eventBus.$on("selectedPeriod", data => {
            this.selectedPeriod = data;
        });
    },
    methods: {
        deleteCompletedTasks() {
            const taskQuery = db
                .collection("tasks")
                .where("period", "==", this.selectedPeriod)
                .where("completed", "==", true);

            taskQuery.get().then(querySnapshot => {
                console.log("got documents");
                querySnapshot.forEach(doc => {
                    doc.ref.delete();
                });
            });
        }
    }
};
</script>
