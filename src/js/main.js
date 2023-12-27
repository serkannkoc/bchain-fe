import '../scss/styles.scss'
import { createApp } from "vue";
import App from "../App.vue";
import {createPinia} from "pinia";
import router from "../router/index.js";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min"


let app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");























