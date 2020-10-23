import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "../firebaseConfig";
import Home from "../views/Home.vue";
import Vending from "../views/Vending.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "*",
        redirect: "/login"
    },
    {
        path: "/",
        redirect: "/login"
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
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/vending",
        name: "Vending",
        component: Vending
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !currentUser) next("login");
    else if (!requiresAuth && currentUser) next("home");
    else next();
});

export default router;
