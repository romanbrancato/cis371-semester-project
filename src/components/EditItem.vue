<template>
    <div class="upload-container" @click="replaceImage">
        <label for="photo-upload" class="upload-label" v-if="!image">
            <fa :icon="['fas', 'photo-film']" />
            <span>Add Photo</span>
        </label>
        <input id="photo-upload" type="file" accept="image/*" @change="handleFileUpload">
        <img v-if="image" :src="image" class="uploaded-image">
    </div>
    <div class="item-properties-container">
        <form>
            <br>
            <input id="item_name" v-model="item_name" required placeholder="Item Name">
            <br>
            <textarea style="font-family: sans-serif;" class="description" v-model="description" required
                placeholder="Description..."></textarea>
            <br>
            <input class="price" type="number" id="price" v-model="price" required placeholder="Price">
            <br>
            <input class="location" type="text" id="location" v-model="location" required placeholder="City, State">
        </form>
        <button class="circular-button" title="Update Listing" type="submit" @click="updateListing">
            <fa :icon="['fas', 'pen-to-square']" />
        </button>
    </div>
</template>
  
<script lang="ts">
import { db, storage } from "../main";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, } from "firebase/storage";

interface Item {
    item_name: string;
    description: string;
    price: number;
    location: string;
    image_url: string;
    timestamp: string;
    user_id: string;
}

let file: File;

export default {
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            image: null as string | null,
            item_name: "",
            description: "",
            price: null as number | null,
            location: "",
            item: null as Item | null,
            timestamp: "",
        };
    },
    async mounted() {
        const listingsRef = collection(db, "listings");
        const itemDoc = doc(listingsRef, this.id);
        const itemDocData = await getDoc(itemDoc);
        this.item = itemDocData.exists() ? itemDocData.data() as Item : null;

        if (this.item) {
            this.item_name = this.item.item_name || "";
            this.description = this.item.description || "";
            this.price = this.item.price ?? null;
            this.location = this.item.location || "";
            this.image = this.item.image_url || null;
            this.timestamp = this.item.timestamp || "";
        }
    },
    methods: {
        handleFileUpload(event: Event) {
            if (event.target instanceof HTMLInputElement && event.target.files) {
                file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    const result = reader.result;
                    if (typeof result === "string") {
                        this.image = result;
                    }
                };
                reader.readAsDataURL(file);
            }
        },
        replaceImage() {
            if (this.image) {
                const input = document.getElementById('photo-upload');
                if (input) {
                    input.click();
                }
            }
        },
        async updateListing() {
            const listingsRef = collection(db, "listings");
            const itemDoc = doc(listingsRef, this.id);
            const updatedItem = {
                item_name: this.item_name,
                description: this.description,
                price: this.price,
                location: this.location,
                image_url: this.item?.image_url || null
            };
            if (file && this.item != null) {
                const storageRef = ref(storage, "images/" + this.item.user_id + "/" + this.item.timestamp);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                updatedItem.image_url = downloadURL;
            }
            await updateDoc(itemDoc, updatedItem);
            alert("Listing updated")
        }
    },
};
</script>


<style scoped>
.item-properties-container {
    position: fixed;
    left: 75%;
    transform: translateX(-50%);
    width: 40vh;
    height: 85vh;
    border-radius: 40px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    background: linear-gradient(to bottom right, #90B5B0, White);
}

.upload-container {
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
    cursor: pointer;
}

.uploaded-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.upload-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
}

.upload-label span {
    font-size: 16px;
    font-weight: bold;
}

input[type="file"] {
    display: none;
}

input {
    width: 190px;
    height: 35px;
    padding: 5px 20px;
    margin: 25px auto;
    font-size: 16px;
    border: 1px solid #94BAB5;
    border-color: #8CB0AB;
    border-radius: 30px;
    caret-color: black;
    color: black;
}

input:focus {
    outline: none;
}

.description {
    height: 315px;
    width: 190px;
    padding: 8px 20px;
    margin: 15px auto;
    font-size: 16px;
    border: 1px solid #94BAB5;
    border-color: #8CB0AB;
    border-radius: 20px;
    caret-color: black;
    color: black;
    resize: none;
}

textarea:focus {
    outline: none;
}

.price {
    background: white url("src/assets/dollar-sign.svg") no-repeat 10px center;
    background-size: 20px 20px;
    padding-left: 40px;
}

.circular-button {
    position: fixed;
    bottom: 4%;
    right: 15%;
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
    padding: 0;
}

.circular-button:hover {
    background-color: #E3D5C4;
}
</style>