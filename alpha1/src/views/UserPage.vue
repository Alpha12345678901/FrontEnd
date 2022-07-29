<template>
    <simple-upload/>
</template>
<script>

 import SimpleUpload from '../components/SimpleUpload.vue'
 import {
  getAuth,
} from "firebase/auth";
 console.log(getAuth());
 export default{
     name:"UserPage",
     components: {SimpleUpload}
 }
</script>
