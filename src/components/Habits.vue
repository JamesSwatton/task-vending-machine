<template>
    <div id="habits" class="px-8 border-l border-gray-300">
        <div id="daily" class="habit-heading">
            <p class="text-3xl text-gray-800">Today</p>
            <btn-add-app class="place-self-end"></btn-add-app>
        </div>
        <habit-app></habit-app>
        <div id="weekly" class="habit-heading">
            <p class="text-3xl text-gray-800">Weekly</p>
            <btn-add-app></btn-add-app>
        </div>
        <div id="monthly" class="habit-heading">
            <p class="text-3xl text-gray-800">Monthly</p>
            <btn-add-app></btn-add-app>
        </div>
    </div>
</template>

<script>
import firebase from "../firebaseConfig";
import BtnAdd from "../components/buttons/BtnAdd";
import Habit from "../components/Habit";

const db = firebase.firestore();

export default {
    name: "Habits",
    components: {
        "btn-add-app": BtnAdd,
        "habit-app": Habit
    },
    data() {
        return {
            daily: [],
            weekly: [],
            monthly: []
        };
    },
    firestore: {
        daily: db.collection("habits").where("period", "==", 1),
        weekly: db.collection("habits").where("period", "==", 2),
        monthly: db.collection("habits").where("period", "==", 3)
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
