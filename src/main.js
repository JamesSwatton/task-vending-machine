import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { firestorePlugin } from "vuefire";
import "./assets/tailwind.css";

export const eventBus = new Vue();

Vue.config.productionTip = false;

Vue.use(firestorePlugin);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
