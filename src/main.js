import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faUserMinus,
  faUserPlus,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

library.add(faUserMinus, faUserPlus, faArrowUp, faArrowDown);

const app = createApp(App);

app.config.globalProperties.$helper = {
  current_id: 0,
  profilePic() {
    let rnd_num = Math.floor(Math.random() * 11) + 1;
    return "img/img" + rnd_num + ".jpeg";
  },
};

app.use(router);

app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
