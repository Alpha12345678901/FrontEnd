<template>
  <router-view />
  <p><button v-if="isLoggedIn" @click="handleSignOut">Sign Out</button></p>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
const isLoggedIn = ref(false);
const router = useRouter();
let auth;
 onMounted( ()=>{
     auth=getAuth();
     onAuthStateChanged(auth, (user)=>{
         if(user){
             isLoggedIn.value=true;
         }
         else{
             isLoggedIn.value=false;
         }
     })
 })
  const handleSignOut = () => {
    signOut(auth).then(()=>{
      router.push("/")
    })
  }
</script>

<style lang="scss">
@import "~bulma/css/bulma.css";
</style>
