import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element";
import CountryFlag from "@attonex/country-flag";

Vue.config.productionTip = false;

Vue.use(CountryFlag);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
