import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import { RestBooks } from "@/infrastructure/secondary/RestBooks";

Vue.config.productionTip = false;

const openlibrary = axios.create({
  baseURL: "https://openlibrary.org",
});

const books = new RestBooks(openlibrary);

new Vue({
  render: (h) => h(App),
  provide: {
    books: () => books,
  },
}).$mount("#app");
