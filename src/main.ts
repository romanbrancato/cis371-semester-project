import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'

import { createRouter, createWebHashHistory } from "vue-router"
import Home from "./components/Home.vue"
import Login from "./components/Login.vue"
import SignUp from "./components/SignUp.vue"
import Profile from "./components/Profile.vue"
import Statistics from "./components/Statistics.vue"
import CreateOffer from "./components/CreateOffer.vue"
import Item from "./components/Item.vue"
import Help from "./components/Help.vue"


const componentRoutes = [
    { path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/signup", component: SignUp },
    { path: "/profile", component: Profile },
    { path: "/help", component: Help },
    { path: "/statistics", component: Statistics },
    { path: "/createoffer", component: CreateOffer },
    { path: "/item", component: Item },
];

const router = createRouter({
    routes: componentRoutes,
    history: createWebHashHistory()
});

library.add(fas);

createApp(App)
    .use(router)
    .component('fa', FontAwesomeIcon)
    .mount('#app')
