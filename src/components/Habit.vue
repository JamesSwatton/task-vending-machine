<template>
    <div class="flex justify-between max-w-full pt-5">
        <div class="flex items-center">
            <div class="flex items-center flex-shrink-0 h-6">
                <p
                    id="habit-count"
                    class="max-h-full px-5 text-lg font-light leading-tight text-white bg-blue-400 rounded-full"
                >
                    {{ habitCopy.count }} / {{ habitCopy.max }}
                </p>
            </div>
            <p id="habit-title" class="px-4 text-lg font-light text-gray-900">
                {{ habit.title }}
            </p>
        </div>
        <div id="update-habit" class="flex items-center">
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
                class="flex items-center justify-center w-6 h-6 bg-transparent rounded-full"
            >
                <svg
                    class="w-5 h-5 fill-current"
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

const db = firebase.firestore();

export default {
    name: "Habit",
    props: ["habit", "recentlyAddedId", "id"],
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
    },
    methods: {
        increase() {
            if (this.updatingHabit) {
                this.habitCopy.max++;
            } else {
                this.habitCopy.count++;
            }
        },
        decrease() {
            if (this.updatingHabit && this.habitCopy.max > 0) {
                this.habitCopy.max--;
            } else if (!this.updatingHabit && this.habitCopy.count > 0) {
                this.habitCopy.count--;
            }
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
