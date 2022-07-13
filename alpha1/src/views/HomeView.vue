<template>
  <div class="home">
<div id="myBoard" style="width: 400px"></div>
  </div>
</template>
<script>
    import { Chess } from 'chess.js'
    const chess = new Chess()
    console.log(chess.ascii())
export default {
  name: 'HomeView',
}
</script>
