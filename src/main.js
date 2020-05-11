//archivo app entry point
import Vue from "vue";
import Notifications from "vue-notification";
import App from "./App.vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import firebase from "firebase";

Vue.config.productionTip = false;
Vue.use(Notifications);
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Your web app's Firebase configuration - variables de entorno deben comenzar con VUE_APP_
var firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_CONFIG_APIKEY,
  authDomain: process.env.VUE_APP_FB_CONFIG_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FB_CONFIG_DATABASEURL,
  projectId: process.env.VUE_APP_FB_CONFIG_PROJECTID,
  storageBucket: process.env.VUE_APP_FB_CONFIG_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_FB_CONFIG_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_FB_CONFIG_APPID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
