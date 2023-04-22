<template>
    <div>
        <div class="image-container" v-if="itemExists">
            <img class="image" :src="item?.image_url">
        </div>
        <div class="item-properties-container" v-if="itemExists">
            <div class="item-header">
                <h1>{{ item?.item_name }}</h1>
                <p>
                    <fa :icon="['fas', 'dollar-sign']" />{{ item?.price }}
                </p>
            </div>
        </div>
        <div class="description-label">Description</div>
        <div class="description-container" v-if="itemExists">
            <div class="properties">
                <p class="description">{{ item?.description }}</p>
                <button class="contact" @click="showContactInfo">
                    <fa :icon="['fas', 'message']" /> Contact Seller
                </button>
                <p v-if="showSellerEmail">{{ item?.user_id }}</p>
                <p>
                    <fa :icon="['fas', 'location-dot']" /> {{ item?.location }}
                </p>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { db } from "../main";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

interface Item {
    item_name: string;
    price: number;
    image_url: string;
    description: string;
    user_id: string;
    location: string;
    loadedAt: number[];
}

export default {
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            item: null as Item | null,
            showSellerEmail: false,
        };
    },
    async mounted() {
        try {
            const listingsRef = collection(db, "listings");
            const itemDoc = doc(listingsRef, this.id);
            const itemDocData = await getDoc(itemDoc);
            this.item = itemDocData.exists() ? (itemDocData.data() as Item) : null;

            if (this.item) {
                const loadedAt = this.item.loadedAt || [];
                loadedAt.push(new Date().getTime());
                const updateData = {
                    loadedAt,
                };
                await updateDoc(itemDoc, updateData);
            }
        } catch (error) {
            console.error(error);
        }
    },
    computed: {
        itemExists() {
            return this.item !== null;
        },
    },
    methods: {
        showContactInfo() {
            this.showSellerEmail = !this.showSellerEmail;
        },
    },
};
</script>
  
<style scoped>
h1 {
    font-weight: 600;
}

.image-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 30%;
    bottom: 25%;
    transform: translateX(-50%);
    width: 50vh;
    height: 50vh;
    border-radius: 40px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    background-color: white;
}

.image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.item-properties-container {
    position: fixed;
    left: 75%;
    transform: translateX(-50%);
    width: 40vh;
    height: 20vh;
    border-radius: 40px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    background: linear-gradient(to bottom right, #E3E6EF, White);
    text-align: left;
}

.item-header {
    text-align: center;
    font-size: 20px;
}

.properties {
    font-size: 16px;
    margin-left: 15px;
}

.description-container {
    position: fixed;
    left: 75%;
    bottom: 0%;
    transform: translateX(-50%);
    width: 40vh;
    height: 60vh;
    border-radius: 40px;
}

.description-label {
    position: fixed;
    left: 65%;
    top: 25%;
    transform: translateX(-50%);
    font-size: 20px;
}

.description {
    text-align: left;
    width: 30vh;
    height: 40vh;
    overflow: auto;
    word-wrap: break-word;
}

.contact {
    margin: 0;
    border: 3px solid black;
    background-color: #F4E5D3;
    border-radius: 30px;
}

.contact:hover {
    background-color: #E3D5C4;
}
</style>