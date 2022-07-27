import {chessboard} from 'vue-chessboard' import
'vue-chessboard/dist/vue-chessboard.css'
<template>
  <label for="fname">Username:</label>
  <input type="text" id="fname" name="fname" /><br /><br />
  <label for="lname">Password:</label>
  <input type="text" id="lname" name="lname" /><br /><br />
  <input type="submit" value="Signup" />
  <input type="text" id="lname" name="lname" v-model="id" /><br /><br />
  <p><button class="button is-primary" @click="join">Join Room</button></p>
  <p><button class="button is-primary" @click="creat">Creat Room</button></p>
  <p v-if="code">Code: {{code}}</p>
</template>
<script setup>
import { io } from "socket.io-client";
import { ref } from "vue";
const id = ref("");
const code= ref();
const socket = io("http://localhost:3000");
socket.on("connect", () => {
  console.log("HI");
});
const join = () => {
  socket.emit("join", id.value);
};
const creat = () => {
  socket.emit("creat", socket.id);
  console.log(socket.id);
   code.value=socket.id;
};
socket.on("HI", () => {
  console.log("HI");
});
</script>
