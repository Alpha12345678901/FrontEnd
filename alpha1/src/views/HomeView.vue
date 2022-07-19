
<template>
  <div class="home">
  <chessboard/>
<div id="board1" style="width: 1000px"></div>
  </div>
</template>
<script>
import ChessBoard from "chessboardjs-vue3";
export default {
mounted(){
            ChessBoard('board1', {
                config: {
                    pieceTheme: '@/wikipedia',
                    position: 'start'
                }
            });
        },
  name: 'HomeView',
}
</script>
