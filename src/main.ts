import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import "./assets/index.postcss";
import keycloak from "@/modules/auth/keycloak";
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import auth from "./plugin/auth"

const head = createHead();
const app = createApp(App);

// app.config.errorHandler = function (err, vm, info) {
//   window.console.error(`Das System ist Fehlerhaft und muss neugestartet werden. Fehler:: ${err}`);
//   alert(`Das System ist Fehlerhaft und muss neugestartet werden. Fehler: ${err}`)
// };
// window.onerror = function (message, source, lineno, colno, error) {
//   window.console.error(`Das System ist Fehlerhaft und muss neugestartet werden. Fehler:: ${error}`);
//   alert(`Das System ist Fehlerhaft und muss neugestartet werden. Fehler: ${error}`)
// };
// window.addEventListener('unhandledrejection', (event) => {
//   window.console.error(`Das System ist Fehlerhaft und muss neugestartet werden. Fehler:: ${event.reason}`);
//   alert(`Das System ist Fehlerhaft und muss neugestartet werden. Fehler:: ${event.reason}`)
// });

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia);
app.use(router);
app.use(head);
app.use(keycloak);
app.component('QuillEditor', QuillEditor)

auth.interceptorsSetup();

app.mount("#app");
