<template>
    <div class="search-container">
        <input type="text" v-model="input" placeholder="Search..." />
        <router-link :to="currentUser ? '/listitem' : '/login'">
            <button class="circular-button" title="Create New Listing">
                <fa :icon="['fas', 'plus']" />
            </button>
        </router-link>
        <div class="listing-label">Listings</div>
    </div>
    <div class="item-container">
        <div class="item" v-for="item in filteredList()" :key="item.id">
            <router-link :to="'/item/' + item.id">
                <img :src="item.image_url">
                <div class="details">
                    <h2>{{ item.item_name }}</h2>
                    <p>
                        <fa :icon="['fas', 'dollar-sign']" />{{ item.price }}
                    </p>
                    <p>
                        <fa :icon="['fas', 'location-dot']" /> {{ item.location }}
                    </p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { auth, db } from "../main";
import { collection, onSnapshot } from "firebase/firestore";

const currentUser = ref(auth.currentUser);
let input = ref("");
let items: { id: string, item_name: string, price: number, description:string, location: string, image_url: string }[] = reactive([]);


onMounted(() => {
    const listingsRef = collection(db, "listings");
    onSnapshot(listingsRef, (querySnapshot) => {
        items.length = 0;
        querySnapshot.forEach((doc) => {
            const item = {
                id: doc.id,
                item_name: doc.data().item_name,
                price: doc.data().price,
                description: doc.data().description,
                location: doc.data().location,
                image_url: doc.data().image_url
            };
            items.push(item);
        });
    });
});

function filteredList() {
    return items.filter((item) => {
        const searchTerm = input.value.toLowerCase();
        const itemName = item.item_name.toLowerCase();
        const description = item.description.toLowerCase();
        const location = item.location.toLowerCase();
        return (
            itemName.includes(searchTerm) ||
            description.includes(searchTerm) ||
            location.includes(searchTerm)
        );
    });
}
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    color: black
}

body {
    padding: 20px;
    min-height: 100vh;
}

input {
    position: fixed;
    bottom: 25%;
    left: 10%;
    width: 450px;
    height: 60px;
    margin: 20px auto;
    padding: 10px 45px;
    background: white url("/magnifying-glass.svg") no-repeat 15px center;
    background-size: 15px 15px;
    font-size: 16px;
    border: 1px solid #94BAB5;
    border-color: #8CB0AB;
    border-radius: 30px;
    caret-color: black;
    color: black;
}

input:focus {
    outline: none;
    border-color: #8CB0AB;
}

.search-container {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    width: 150vh;
    height: 40vh;
    border-radius: 40px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    background: linear-gradient(to bottom right, #90B5B0, White);
}

.circular-button {
    position: fixed;
    bottom: 10%;
    right: 3%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 3px solid;
    background-color: #F4E5D3;
    cursor: pointer;
    font-size: 24px;
}

.circular-button:hover {
    background-color: #E3D5C4;
}

.listing-label {
    position: fixed;
    bottom: -10%;
    font-size: 20px;
}

.item-container {
    position: fixed;
    bottom: 0%;
    width: 150vh;
    height: 40vh;
    background: white;
    overflow: auto;
}

.item {
    display: inline-block;
    bottom: 10%;
    width: 265px;
    height: 300px;
    margin: 0 10px 10px 0;
    padding: 6px 6px;
    color: white;
    background: linear-gradient(to bottom left, #E3E6EF, White);
    cursor: pointer;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    overflow: hidden;
}

.details {
    position: relative;
    padding-left: 10px;
    text-align: left;
    white-space: nowrap;
}

img {
    width: 100%;
    height: 60%;
    object-fit: contain;
}</style>