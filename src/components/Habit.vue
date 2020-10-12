<template>
    <div class="flex justify-between max-w-full pt-5">
        <div class="flex items-center">
            <div class="flex items-center flex-shrink-0 h-6">
                <p
                    id="count"
                    class="max-h-full px-5 text-lg font-light leading-tight text-white rounded-full"
                    :class="[isCompleted ? 'bg-green-400' : 'bg-blue-400']"
                >
                    {{ habitCopy.count }} / {{ habitCopy.max }}
                </p>
            </div>
            <p id="title" class="title" v-if="!updatingHabit">
                {{ habit.title }}
            </p>
            <input
                type="text"
                class="bg-transparent border-b-2 border-transparent width title box-border focus:border-gray-800 focus:outline-none"
                v-model="habitCopy.title"
                v-focus
                v-else
            />
        </div>
        <div id="edit" class="flex items-center">
            <button id="decrease" @click="decrease">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    class="w-6 h-6 text-gray-500 fill-current hover:text-gray-800"
                >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"
                    />
                </svg>
            </button>
            <button id="increase" @click="increase">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-gray-500 fill-current hover:text-gray-800"
                    viewBox="0 0 24 24"
                >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
                    />
                </svg>
            </button>
            <button
                id="update"
                class="flex items-center justify-center w-6 h-6 rounded-full"
                :class="[updatingHabit ? 'bg-gray-800' : 'bg-transparent']"
                @click="updateHabit"
            >
                <svg
                    class="w-5 h-5 fill-current"
                    :class="[updatingHabit ? 'text-white' : 'text-gray-800']"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                    />
                </svg>
            </button>
            <btn-delete-app @click.native="deleteHabit(habit)"></btn-delete-app>
        </div>
    </div>
</template>

<script>
import firebase from "../firebaseConfig";
import BtnDeleteAll from "./buttons/BtnDeleteAll";
import { eventBus } from "../main";

const db = firebase.firestore();

export default {
    name: "Habit",
    props: ["habit", "recentlyAddedId", "id"],
    directives: {
        focus: {
            inserted(el) {
                el.focus();
            }
        }
    },
    components: {
        "btn-delete-app": BtnDeleteAll
    },
    data() {
        return {
            habitCopy: {},
            updatingHabit: false
        };
    },
    computed: {
        isRecentHabit() {
            return this.id == this.recentlyAddedId;
        },
        isCompleted() {
            return this.habit.count == this.habit.max;
        }
    },
    watch: {
        isRecentHabit() {
            if (this.isRecentHabit) {
                this.updatingHabit = true;
            }
        }
    },
    created() {
        this.habitCopy = { ...this.habit };
        this.habitReset();
    },
    methods: {
        increase() {
            if (this.updatingHabit) {
                this.habitCopy.max++;
            } else if (
                !this.updatingHabit &&
                this.habitCopy.count < this.habitCopy.max
            ) {
                this.habitCopy.count++;
                this.updateCount(this.habitCopy.count);
            }
        },
        decrease() {
            if (this.updatingHabit && this.habitCopy.max > 0) {
                this.habitCopy.max--;
            } else if (!this.updatingHabit && this.habitCopy.count > 0) {
                this.habitCopy.count--;
                this.updateCount(this.habitCopy.count);
            }
        },
        updateCount(newCount) {
            db.collection("habits")
                .doc(this.id)
                .update({ count: newCount, updatedAt: Date.now() })
                .then(function() {
                    console.log("Habit count successfully updated!");
                })
                .catch(function(error) {
                    console.error("Error updating document: ", error);
                });
        },
        newResetTime(period) {
            console.log("poop");
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
                var nextMonth = d.getMonth() + 1;
                resetTime = nextMonth;
            }

            db.collection("habits")
                .doc(this.id)
                .update({
                    count: 0,
                    updatedAt: Date.now(),
                    resetTime: resetTime
                })
                .then(function() {
                    console.log("Habit count successfully reset!");
                })
                .catch(function(error) {
                    console.error("Error updating document: ", error);
                });
        },
        habitReset() {
            const d = new Date();
            if (this.habit.period == 1 && Date.now() > this.habit.resetTime) {
                this.newResetTime(1);
            } else if (
                this.habit.period == 2 &&
                Date.now() > this.habit.resetTime
            ) {
                this.newResetTime(2);
            } else if (
                this.habit.period == 3 &&
                d.getMonth() > this.habit.resetTime
            ) {
                this.newResetTime(3);
            }
        },
        updateHabit() {
            if (this.updatingHabit) {
                this.habitCopy.updatedAt = Date.now();
                db.collection("habits")
                    .doc(this.id)
                    .update(this.habitCopy)
                    .then(function() {
                        console.log("Document successfully updated!");
                        eventBus.$emit("recentlyAddedHabit", null);
                    })
                    .catch(function(error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            }
            this.updatingHabit = !this.updatingHabit;
        },
        deleteHabit(habit) {
            db.collection("habits")
                .doc(habit.id)
                .delete()
                .then(function() {
                    console.log("Document successfully deleted!");
                })
                .catch(function(error) {
                    console.error("Error removing document: ", error);
                });
        }
    }
};
</script>

<style scoped>
.title {
    @apply mx-4 text-lg font-light text-gray-900;
}
.width {
    width: 162px;
}
</style>
