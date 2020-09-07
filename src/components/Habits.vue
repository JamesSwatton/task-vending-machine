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
import BtnAdd from "../components/buttons/BtnAdd";
import Habit from "../components/Habit";

export default {
    name: "Habits",
    components: {
        "btn-add-app": BtnAdd,
        "habit-app": Habit
    }
};
</script>

<style>
.habit-heading {
    width: 355px;
    @apply flex py-2 justify-between items-center border-b border-gray-500;
}
</style>
