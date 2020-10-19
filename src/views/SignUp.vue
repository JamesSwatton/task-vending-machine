<template>
    <div class="fixed w-screen h-screen bg-gray-200">
        <div class="w-full max-w-xs mx-auto mt-12 bg-white rounded shadow-md">
            <form class="px-8 pt-6 pb-8 mb-4">
                <h3 class="mb-4 text-3xl text-center text-gray-700">
                    Create A New Account
                </h3>
                <div class="mb-4">
                    <label
                        class="block mb-2 text-sm font-bold text-gray-700"
                        for="username"
                    >
                        Email
                    </label>
                    <input
                        class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Email"
                        v-model="email"
                    />
                </div>
                <div class="mb-6">
                    <label
                        class="block mb-2 text-sm font-bold text-gray-700"
                        for="password"
                    >
                        Password
                    </label>
                    <input
                        class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        v-model="password"
                    />
                    <p class="text-xs italic text-red-500">
                        Please choose a password.
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="button"
                        @click="signUp"
                    >
                        Sign Up
                    </button>
                    <p class="text-gray-800">
                        or go back to
                        <router-link to="/login" class="text-blue-500 underline"
                            >login</router-link
                        >.
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from "../firebaseConfig";

const db = firebase.firestore();

export default {
    name: "SignUp",
    data() {
        return {
            email: "",
            password: "",
            defaultTask: {
                title: "Title",
                description: "Description",
                completed: false,
                colour: 1,
                period: 1,
                updatedAt: null,
                createdAt: Date.now()
            },
            defaultHabit: {
                title: "Title",
                period: 1,
                resetTime: null,
                count: 0,
                max: 0,
                id: null,
                updatedAt: null,
                createdAt: Date.now()
            }
        };
    },
    methods: {
        signUp() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(result => {
                    this.createUserDoc(result.user.uid);
                })
                .then(() => {
                    this.$router.replace("home");
                });
        },
        createUserDoc(uid) {
            db.collection("users")
                .doc(uid)
                .collection("tasks")
                .add(this.defaultTask)
                .then(() => {
                    console.log("Account successfully created!");
                    console.log("Task document added");
                })
                .catch(error => {
                    console.error("Error writing document: ", error);
                });

            db.collection("users")
                .doc(uid)
                .collection("habits")
                .add(this.defaultHabit)
                .then(() => {
                    console.log("Habit document added");
                })
                .catch(error => {
                    console.error("Error writing document: ", error);
                });
        }
    }
};
</script>

<style scoped></style>
