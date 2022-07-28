<template>
    <p>HI</p>
    <input type="file" @change="onFileChanged">
<button @click="onUpload">Upload!</button>
</template>
<script setup>
 import {
  getAuth,
} from "firebase/auth";
 import axios from "axios";
 console.log(getAuth());
 var selectedFile=null;
function onFileChanged (event) {
    selectedFile = event.target.files[0]
  }
function onUpload() {
  axios.post('http://localhost:3000/uploadAI', selectedFile)
}

</script>
