
<template>
  <div class="home">
  <chessboard/>
  <div id="myBoard" style="width: 1000px"></div>
  </div>
  <ul>
       <li v-for="ai in AI" :key="ai">{{ai}} </li>
   </ul>
   <input type="text" v-bind="CurrentAI">
</template>
<script>
import ChessBoard from "chessboardjs-vue3";
import { Chess } from 'chess.js'
import axios from 'axios';
import { io } from "socket.io-client";
export default {
data() {
    return {
      file:"",
      message:"",
      CurrentAi:"jonklo2002-AI1.py",
      AI:[],
      socket:null
    }
  },

mounted() {
    axios.get('http://localhost:3000/ListAllAI').then((data)=>{
              this.AI=data.data.AI;
      console.log(this.AI);
          })
   var socket=io("http://localhost:3000");
    var board = null
    var game = new Chess()

    function onDragStart (source, piece, position, orientation) {
      // do not pick up pieces if the game is over
      if (game.game_over()) return false

      // only pick up pieces for White
      if (piece.search(/^b/) !== -1) return false

      //logs to make vue shut up about unused variables
      console.log(position)
      console.log(orientation)
      console.log(this.CurrentAI);
    }

    function makeRandomMove () {
      var possibleMoves = game.moves()

      // game over
      if (possibleMoves.length === 0) return

      console.log(socket);
      socket.emit("moveAI",{AIName:"jonklo2002-AI1.py",Game:game.fen()});
      socket.on("MoveMade", params=>{
        console.log(params);
        game.move({
        from: params.substring(0,2),
        to: params.substring(2,4),
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
      })

      board.position(game.fen())
      })
    }

    function onDrop (source, target) {
      // see if the move is legal
      var move = game.move({
        from: source,
        to: target,
        promotion: 'q' // NOTE: always promote to a queen for example simplicity
      })

      // illegal move
      if (move === null) return 'snapback'

      // make random legal move for black
      window.setTimeout(makeRandomMove, 250)
    }

    // update the board position after the piece snap
    // for castling, en passant, pawn promotion
    function onSnapEnd () {
      board.position(game.fen())
    }

    var config = {
      draggable: true,
      position: 'start',
      pieceTheme: '/wikipedia/{piece}.png',
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd
    }
    board = ChessBoard('myBoard', config)
  },
  name: 'HomeView',
}
</script>
<style lang="sass" src="bulma" scoped></style>
