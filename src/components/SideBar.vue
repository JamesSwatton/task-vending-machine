<template>
    <div
        class="fixed flex flex-col items-center w-20 h-screen border-r border-gray-300"
    >
        <logo-app class="pt-6" size="small"></logo-app>
        <slot></slot>
        <button class="absolute bottom-0 mb-8" @click="logout">
            <svg
                class="w-8 h-8 text-gray-600 fill-current hover:text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
            >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                    d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 00-1.41 0l-6.59 6.59a.996.996 0 000 1.41l6.59 6.59a.996.996 0 101.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"
                />
            </svg>
        </button>
    </div>
</template>

<script>
import firebase from "../firebaseConfig.js";
import Logo from "./Logo.vue";
export default {
    name: "SideBar",
    components: {
        "logo-app": Logo
    },
    methods: {
        logout() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.replace("login");
                });
        }
    }
};
</script>
