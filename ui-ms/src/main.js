import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";

import "./styles/app.css";

Vue.config.productionTip = false;

// @ts-ignore
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
