<template>
  <h1>Create an Acount</h1>
  <p class="error" v-if="errMsg">{{ errMsg }}</p>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p><button class="button is-primary" @click="signIn">Sign In</button></p>
  <p><button class="button is-primary" @click="register">Register</button></p>
  <p>
    <button class="button is-primary" @click="signInWithGoogle">
      Sign In With Google
    </button>
  </p>
</template>
<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();
const errMsg = ref();
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value).then(
    () => {
      router.push("/home");
    }
  );
};
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider).then(() => {
    router.push("/home");
  });
};
const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(() => {
      router.push("/home");
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect Password";
          break;
        default:
          errMsg.value = "Email or Password was incorrect";
          break;
      }
    });
};
</script>

<style lang="scss">
@import "~bulma/css/bulma.css";
.error {
  color: red;
}
</style>
