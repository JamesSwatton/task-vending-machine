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

export default {
    name: "SignUp",
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        signUp() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(
                    result => {
                        console.log(result.user.uid);
                        this.$router.replace("home");
                    },
                    err => {
                        alert("Oops. " + err.message);
                    }
                );
        }
    }
};
</script>

<style scoped></style>
