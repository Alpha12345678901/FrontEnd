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
  <div id="myBoard" v-show="gamestart" style="width: 1000px"></div>
</template>
<script setup>
import ChessBoard from "chessboardjs-vue3";
import { Chess } from 'chess.js'
import { io } from "socket.io-client";
import { ref } from "vue";
const id = ref("");
var permID="";
const code= ref();
const gamestart=ref(false);
var board = null;
var game = new Chess();
var orient=""
const socket = io("http://localhost:3000");
socket.on("connect", () => {
  console.log("HI");
});
const join = () => {
   if(id.value!=""){
   socket.emit("join", id.value);
   }
   permID=id.value;
};
const creat = () => {
   console.log(socket.rooms);

    socket.emit("creat", socket.id);
  console.log(socket.id);
   code.value=socket.id;
   permID=socket.id;
};
socket.on("HI", (param) => {
   gamestart.value=true;
  console.log(param);

   var config = {
      draggable: true,
      position: 'start',
      pieceTheme: '/wikipedia/{piece}.png',
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd,
      orientation: param
  }
  board = ChessBoard('myBoard', config);
   orient=param;
});
 function onDragStart (source, piece, position, orientation) {
      // do not pick up pieces if the game is over
      if (game.game_over()) return false

      // only pick up pieces for White
      console.log(orient[0]);
      console.log(piece);
      console.log(piece.search(orient[0]));
      if (piece.search(orient[0])==-1) return false

      //logs to make vue shut up about unused variables
      console.log(position)
      console.log(orientation)
    }
 socket.on("moves", (param) =>{
   console.log(param);
game.move({
        from: param.Source,
        to: param.Target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
      })

      board.position(game.fen())
 });
function onDrop (source, target) {
      socket.emit("move",{Source:source, Target:target, RoomID:permID})
      console.log(source);
      console.log(target);
      // see if the move is legal
      var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
      })
      console.log(move);

      // illegal move
      if (move === null) return 'snapback'

      // make random legal move for black
    }

    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    function onSnapEnd () {
      board.position(game.fen())
    }



</script>
