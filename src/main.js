import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { firestorePlugin } from "vuefire";

Vue.config.productionTip = false;

Vue.use(firestorePlugin);

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
