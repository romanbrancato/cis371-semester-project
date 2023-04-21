<template>
    <div class="item-container">
        <div class="item" v-for="(item) in items" :key="item.id">
            <img :src="item.image_url">
            <div class="details">
                <h2>{{ item.item_name }}</h2>
                <p>${{ item.price }}</p>
                <p>{{ item.location }}</p>
                <div class="button-container">
                    <router-link :to="'/item/' + item.id + '/edit'">
                        <div class="circular-button">
                            <fa :icon="['fas', 'pen-to-square']" />
                        </div>
                    </router-link>
                    <div class="circular-button" @click="deleteItem(item)">
                        <fa :icon="['fas', 'xmark']" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { auth, db } from "../main";
import { collection, onSnapshot, query, where, deleteDoc, doc } from "firebase/firestore";


const currentUser = ref(auth.currentUser);
let items: { id: string, item_name: string, price: number, location: string, image_url: string }[] = reactive([]);

onMounted(() => {
    const listingsRef = collection(db, "listings");
    const q = query(listingsRef, where("user_id", "==", currentUser.value?.email));
    onSnapshot(q, (querySnapshot) => {
        items.length = 0;
        querySnapshot.forEach((doc) => {
            const item = {
                id: doc.id,
                item_name: doc.data().item_name,
                price: doc.data().price,
                location: doc.data().location,
                image_url: doc.data().image_url
            };
            items.push(item);
        });
    });
});

const deleteItem = async (item: { id: string, item_name: string, price: number, location: string, image_url: string }) => {
    try {
        const docRef = doc(db, "listings", item.id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error("Error deleting item: ", error);
    }
};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    color: black
}

.item-container {
    position: fixed;
    width: 100vh;
    height: 85vh;
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

.item-container::-webkit-scrollbar {
    width: 7px;
}

.item-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 20px;
}

.item-container::-webkit-scrollbar-thumb {
    background: #F4E5D3;
    border-radius: 20px;
    border: 1px solid;
}

.item-container::-webkit-scrollbar-thumb:hover {
    background: #E3D5C4;
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
}

.button-container {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0px;
    right: 10px;
}

.circular-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 3px solid;
    background-color: #F4E5D3;
    cursor: pointer;
    font-size: 15px;
    margin-top: 10px;
}

.circular-button:hover {
    background-color: #E3D5C4;
}
</style>