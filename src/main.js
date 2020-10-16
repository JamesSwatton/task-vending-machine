import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "./firebaseConfig";
import { firestorePlugin } from "vuefire";
import "./assets/tailwind.css";

export const eventBus = new Vue();

let app = "";

Vue.config.productionTip = false;

Vue.use(firestorePlugin);

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            router,
            render: h => h(App)
        }).$mount("#app");
    }
});
