<template>
    <div class="search-container">
        <input type="text" v-model="input" placeholder="Search..." />
        <router-link :to="currentUser ? '/listitem' : '/login'">
            <button class="circular-button" title="Create New Listing">
                <fa :icon="['fas', 'plus']" />
            </button>
        </router-link>
    </div>
    <div>Listings</div>
    <div class="item-container">
        <div class="item" v-for="item in filteredList()" :key="item.id">
            <img :src="item.image_url">
            <div class="details">
                <h2>{{ item.item_name }}</h2>
                <p>${{ item.price }}</p>
                <p>{{ item.location }}</p>
            </div>
        </div>
        <div class="error" v-if="input && !filteredList().length">
            <p>No results found!</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted} from "vue";
import { auth, db } from "../main";
import { collection, onSnapshot } from "firebase/firestore";

const currentUser = ref(auth.currentUser);
let input = ref("");
let items = reactive([])

onMounted(() => {
    const listingsRef = collection(db, "listings");
    onSnapshot(listingsRef, (querySnapshot) => {
        const newItems = [];
        querySnapshot.forEach((doc) => {
            const item = {
                id: doc.id,
                ...doc.data()
            };
            newItems.push(item);
        });
        items = newItems;
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
    background: white url("src/assets/magnifying-glass.svg") no-repeat 15px center;
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
}

/* Style the scrollbar in item-container*/
.item-container::-webkit-scrollbar {
    width: 7px;
}

/* Track */
.item-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 20px;
}

/* Handle */
.item-container::-webkit-scrollbar-thumb {
    background: #F4E5D3;
    border-radius: 20px;
    border: 1px solid;
}

/* Handle on hover */
.item-container::-webkit-scrollbar-thumb:hover {
    background: #E3D5C4;
}
.details {
    position:fixed;
    bottom: 12%;
  text-align: left;
}

img{
    width: 100%;
    height: 60%;
}
</style>