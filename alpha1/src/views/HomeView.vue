
<template>
  <div class="home">
  <chessboard/>
  <div id="myBoard" style="width: 1000px"></div>
  </div>
</template>
<script>
import ChessBoard from "chessboardjs-vue3";
import { Chess } from 'chess.js'
export default {
mounted() {
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
    }

    function makeRandomMove () {
      var possibleMoves = game.moves()

      // game over
      if (possibleMoves.length === 0) return

      var randomIdx = Math.floor(Math.random() * possibleMoves.length)
      game.move(possibleMoves[randomIdx])
      board.position(game.fen())
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
