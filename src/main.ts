import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import { createHead } from "@vueuse/head";
import "./assets/index.postcss";

const head = createHead();
const app = createApp(App);

app.config.errorHandler = function (err, vm, info) {
  window.console.error(`Das System ist Fehlerhaft und muss neugestartet werden. Fehler:: ${err}`);
  alert(`Das System ist Fehlerhaft und muss neugestartet werden. Fehler: ${err}`)
};
window.onerror = function (message, source, lineno, colno, error) {
  window.console.error(`Das System ist Fehlerhaft und muss neugestartet werden. Fehler:: ${error}`);
  alert(`Das System ist Fehlerhaft und muss neugestartet werden. Fehler: ${error}`)
};
window.addEventListener('unhandledrejection', (event) => {
  window.console.error(`Das System ist Fehlerhaft und muss neugestartet werden. Fehler:: ${event.reason}`);
  alert(`Das System ist Fehlerhaft und muss neugestartet werden. Fehler:: ${event.reason}`)
});

app.use(createPinia());
app.use(router);
app.use(head);

app.mount("#app");
