<template>
    <div id="habits" class="px-8 border-l border-gray-300">
        <div id="daily" class="habit-heading">
            <p class="text-3xl text-gray-800">Today</p>
            <btn-add-app @click.native="addNewHabit(1)"></btn-add-app>
        </div>
        <habit-app
            v-for="dailyHabit in daily"
            :key="dailyHabit.id"
            :habit="dailyHabit"
            :recentlyAddedId="recentlyAddedId"
            :id="dailyHabit.id"
        ></habit-app>
        <div id="weekly" class="habit-heading">
            <p class="text-3xl text-gray-800">Weekly</p>
            <btn-add-app @click.native="addNewHabit(2)"></btn-add-app>
        </div>
        <div id="monthly" class="habit-heading">
            <p class="text-3xl text-gray-800">Monthly</p>
            <btn-add-app @click.native="addNewHabit(3)"></btn-add-app>
        </div>
    </div>
</template>

<script>
import firebase from "../firebaseConfig";
import BtnAdd from "../components/buttons/BtnAdd";
import Habit from "../components/Habit";
import { eventBus } from "../main.js";

const db = firebase.firestore();

export default {
    name: "Habits",
    components: {
        "btn-add-app": BtnAdd,
        "habit-app": Habit
    },
    data() {
        return {
            recentlyAddedId: null,
            defaultHabit: {
                title: "Title",
                period: null,
                count: 0,
                max: 0,
                id: null,
                updatedAt: null
            },
            daily: [],
            weekly: [],
            monthly: []
        };
    },
    firestore: {
        daily: db.collection("habits").where("period", "==", 1),
        weekly: db.collection("habits").where("period", "==", 2),
        monthly: db.collection("habits").where("period", "==", 3)
    },
    methods: {
        addNewHabit(period) {
            const self = this;
            this.defaultHabit.period = period;
            this.defaultHabit.updatedAt = Date.now();

            db.collection("habits")
                .add(this.defaultHabit)
                .then(function(docRef) {
                    self.recentlyAddedId = docRef.id;
                    console.log(
                        "Document successfully written with id: ",
                        docRef.id
                    );
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
        }
    },
    created() {
        eventBus.$on("recentlyAddedHabit", data => {
            this.recentlyAddedId = data;
        });
    }
};
</script>

<style>
#habits {
    min-width: 420px;
}
.habit-heading {
    @apply flex py-2 justify-between items-center border-b border-gray-500;
}
</style>
