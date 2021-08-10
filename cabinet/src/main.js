import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import VCalendar from 'v-calendar';
import { FontAwesomeIcon } from "@/plugins/font-awesome"




createApp(App)
    .use(router)
    .use(store)
    .use(VCalendar, {})
    .component("font-awesome-icon", FontAwesomeIcon)    
    .mount('#app')
