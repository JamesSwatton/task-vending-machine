import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue"
import SignUp from "../views/SignUp.vue"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/sign-up",
        name: "SignUp",
        component: SignUp
    }
];

const router = new VueRouter({
    routes
});

export default router;
