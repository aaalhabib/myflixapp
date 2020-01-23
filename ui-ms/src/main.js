import Vue from "vue";
import VueCarousel from "vue-carousel";

import App from "./App";
import router from "./router";
import store from "./store";

import "./styles/app.css";

Vue.use(VueCarousel);

Vue.config.productionTip = false;

// @ts-ignore
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
