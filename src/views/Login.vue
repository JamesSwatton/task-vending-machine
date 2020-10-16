<template>
    <div class="fixed w-screen h-screen bg-gray-200">
        <div class="w-full max-w-xs mx-auto mt-12 bg-white rounded shadow-md">
            <logo-app
                class="flex justify-center pt-6 pb-4"
                size="large"
            ></logo-app>
            <form class="px-8 pt-6 pb-8 mb-4 ">
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
                        @click="login"
                    >
                        Sign In
                    </button>
                    <a
                        class="inline-block text-sm font-bold text-blue-500 align-baseline hover:text-blue-800"
                        href="#"
                    >
                        Forgot Password?
                    </a>
                </div>
                <div class="flex flex-col items-center pt-4">
                    <p class="text-gray-800">
                        Don't have an account?
                    </p>
                    <p class="text-gray-800">
                        You can
                        <router-link
                            to="/sign-up"
                            class="text-blue-500 underline"
                        >
                            create one</router-link
                        >.
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from "../firebaseConfig";
import Logo from "../components/Logo.vue";

export default {
    name: "Login",
    components: {
        "logo-app": Logo
    },
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        login() {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(
                    () => {
                        this.$router.replace("home");
                    },
                    err => {
                        alert("Oops. " + err);
                    }
                );
        }
    }
};
</script>

<style scoped></style>
