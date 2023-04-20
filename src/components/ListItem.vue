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
        <button class="circular-button" title="Create New Listing" type="submit" @click="createListing">
            <fa :icon="['fas', 'plus']" />
        </button>
    </div>
</template>
  
<script lang="ts">
import { db, auth, storage } from "../main";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL,} from "firebase/storage";

let file;

export default {
    data() {
        return {
            image: null,
            item_name: "",
            description: "",
            price: null,
            location: ""
        };
    },
    methods: {
        handleFileUpload(event) {
            file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.image = reader.result;
            };
            reader.readAsDataURL(file);
        },
        replaceImage() {
            if (this.image) {
                const input = document.getElementById('photo-upload');
                input.click();
            }
        },
        async createListing() {
            // Get the user id from Firebase auth
            const user = auth.currentUser;
            const userId = user.uid;

            // Create a reference to the Firebase Storage bucket
            const storageRef = ref(storage, `images/${userId}/${Date.now()}`);

            // Upload the file to the bucket using the put method
            const snapshot = await uploadBytes(storageRef, file);

            // Get the download URL for the uploaded file
            const downloadUrl = await getDownloadURL(snapshot.ref);

            // Create a new document in the "listings" collection in Firestore
            const listingsRef = collection(db, "listings");
            await addDoc(listingsRef, {
                item_name: this.item_name,
                description: this.description,
                price: this.price,
                location: this.location,
                image_url: downloadUrl,
                user_id: userId,
            });

            // Reset the form data
            this.item_name = "";
            this.description = "";
            this.price = null;
            this.location = "";
            this.image = null;
        },
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
    background: linear-gradient(to bottom left, #E3E6EF, White);
    cursor: pointer;
}

.uploaded-image {
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    height: auto;
    width: 190px;
    padding: 8px 20px;
    margin: 15px auto;
    font-size: 16px;
    border: 1px solid #94BAB5;
    border-color: #8CB0AB;
    border-radius: 20px;
    caret-color: black;
    color: black;
    min-height: 50px;
    max-height: 315px;
    resize: vertical;
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