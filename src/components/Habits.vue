<template>
    <div class="h-screen border-l border-gray-300">
        <habit-count-app
            title="Habits"
            :completed="completedHabitsNum"
            :count="habitCount"
        ></habit-count-app>
        <div id="habits" class="px-8 pt-32">
            <div id="daily" class="pt-1 habit-heading">
                <p class="text-3xl text-gray-800">Daily</p>
                <btn-add-app @click.native="addNewHabit(1)"></btn-add-app>
            </div>
            <habit-app
                v-for="dailyHabit in daily"
                :key="dailyHabit.id"
                :habit="dailyHabit"
                :recentlyAddedId="recentlyAddedId"
                :tokenTotal="tokenTotal"
                :id="dailyHabit.id"
            ></habit-app>
            <div id="weekly" class="habit-heading">
                <p class="text-3xl text-gray-800">Weekly</p>
                <btn-add-app @click.native="addNewHabit(2)"></btn-add-app>
            </div>
            <habit-app
                v-for="weeklyHabit in weekly"
                :key="weeklyHabit.id"
                :habit="weeklyHabit"
                :recentlyAddedId="recentlyAddedId"
                :tokenTotal="tokenTotal"
                :id="weeklyHabit.id"
            ></habit-app>
            <div id="monthly" class="habit-heading">
                <p class="text-3xl text-gray-800">Monthly</p>
                <btn-add-app @click.native="addNewHabit(3)"></btn-add-app>
            </div>
            <habit-app
                v-for="monthlyHabit in monthly"
                :key="monthlyHabit.id"
                :habit="monthlyHabit"
                :recentlyAddedId="recentlyAddedId"
                :tokenTotal="tokenTotal"
                :id="monthlyHabit.id"
            ></habit-app>
        </div>
    </div>
</template>

<script>
import firebase from "../firebaseConfig";
import BtnAdd from "./buttons/BtnAdd";
import Habit from "./Habit";
import TaskHabitCount from "./TaskHabitCount";
import { eventBus } from "../main.js";

const db = firebase.firestore();

export default {
    name: "Habits",
    components: {
        "btn-add-app": BtnAdd,
        "habit-app": Habit,
        "habit-count-app": TaskHabitCount
    },
    data() {
        return {
            recentlyAddedId: null,
            tokenTotal: null,
            defaultHabit: {
                title: "Title",
                period: null,
                resetTime: null,
                count: 0,
                max: 1,
                id: null,
                updatedAt: null,
                createdAt: null
            },
            daily: [],
            weekly: [],
            monthly: []
        };
    },
    computed: {
        allHabits() {
            return [...this.daily, ...this.weekly, ...this.monthly];
        },
        completedHabitsNum() {
            var completed = 0;
            this.allHabits.forEach(habit => {
                if (habit.count == habit.max) {
                    completed++;
                }
            });
            eventBus.$emit("completedHabitsNum", completed);
            return completed;
        },
        habitCount() {
            return this.allHabits.length;
        }
    },
    methods: {
        addNewHabit(period) {
            const self = this;
            this.createResetDate(period);
            db.collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("habits")
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
        },
        createResetDate(period) {
            var d = new Date();
            var resetTime;
            if (period == 1) {
                d.setDate(d.getDate() + 1);
                d.setHours(1, 0, 0);
                resetTime = d.getTime();
            } else if (period == 2) {
                var daysUntilNextMonday = 8 - d.getDay();
                d.setDate(d.getDate() + daysUntilNextMonday);
                d.setHours(1, 0, 0);
                resetTime = d.getTime();
            } else if (period == 3) {
                console.log(d.getMonth() + 1);
                var nextMonth = d.getMonth() + 1;
                resetTime = nextMonth;
            }
            this.defaultHabit.resetTime = resetTime;
            this.defaultHabit.period = period;
            this.defaultHabit.updatedAt = Date.now();
            this.defaultHabit.createdAt = Date.now();
        },
        bindData(property, period) {
            const userId = firebase.auth().currentUser.uid;
            this.$bind(
                property,
                db
                    .collection("users")
                    .doc(userId)
                    .collection("habits")
                    .orderBy("createdAt")
                    .where("period", "==", period)
            );
        }
    },
    created() {
        this.bindData("daily", 1);
        this.bindData("weekly", 2);
        this.bindData("monthly", 3);

        eventBus.$on("recentlyAddedHabit", data => {
            this.recentlyAddedId = data;
        });

        eventBus.$on("tokenTotal", data => {
            console.log("habits: " + data);
            this.tokenTotal = data;
        });
    }
};
</script>

<style>
#habits {
    min-width: 420px;
}
.habit-heading {
    @apply flex pb-2 pt-4 justify-between items-center border-b border-gray-500;
}
</style>
