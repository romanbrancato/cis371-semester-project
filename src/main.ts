import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'

import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { createRouter, createWebHashHistory } from "vue-router"
import Storefront from "./components/Storefront.vue"
import Login from "./components/Login.vue"
import SignUp from "./components/SignUp.vue"
import Profile from "./components/Profile.vue"
import Statistics from "./components/Statistics.vue"
import ListItem from "./components/ListItem.vue"
import Help from "./components/Help.vue"
import Item from "./components/Item.vue"
import EditItem from "./components/EditItem.vue"


const firebaseConfig = {
    apiKey: "AIzaSyCIIymb8qViougwffZWRvkvOIhwdFHxA14",
    authDomain: "cis371-semester-project-a00f9.firebaseapp.com",
    projectId: "cis371-semester-project-a00f9",
    storageBucket: "cis371-semester-project-a00f9.appspot.com",
    messagingSenderId: "114693021449",
    appId: "1:114693021449:web:6b2d22079ab707a902fdd8"
};

const app = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage();


const componentRoutes = [
    {
        path: '/item/:id', component: Item,
        props: (route: { params: { id: string } }) => ({
            id: route.params.id
        })
    },
    {
        path: '/item/:id/edit', component: EditItem,
        props: (route: { params: { id: string } }) => ({
            id: route.params.id
        })
    },
    { path: "/", component: Storefront },
    { path: "/login", component: Login },
    { path: "/signup", component: SignUp },
    { path: "/profile", component: Profile },
    { path: "/help", component: Help },
    { path: "/statistics", component: Statistics },
    { path: "/listitem", component: ListItem },
];

export const router = createRouter({
    routes: componentRoutes,
    history: createWebHashHistory()
});

library.add(fas);


createApp(App)
    .use(router)
    .component('fa', FontAwesomeIcon)
    .mount('#app')

