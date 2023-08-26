<script setup lang="ts">
import BoardComponent from './components/BoardComponent.vue'
import { Board } from './models/Board'
import { Player } from './models/Player'
import { Colors } from './models/Colors'
import { ref, onMounted}from 'vue'
import LostFigures from './components/LostFigures.vue'
import type { Figure } from './models/figures/figure'
import TimerComponent from './components/TimerComponent.vue'

const board = ref<Board | null>(new Board())
const whitePlayer = ref(new Player(Colors.WHITE))
const blackPlayer = ref(new Player(Colors.BLACK))
const currentPlayer = ref<Player | null>(null)

const restart = () => {
  const newBoard = new Board()
  newBoard.initCells()
  newBoard.addFigures()
  currentPlayer.value = whitePlayer.value
  board.value = newBoard 
}

const refreshBoard = (e: Board) => {
  board.value = e
}

const swapPlayer = (): void => {
  currentPlayer.value = currentPlayer.value?.color === Colors.WHITE ? blackPlayer.value : whitePlayer.value 
}

onMounted(() => {
  restart()
})
</script>

<template>
  <div class="app">
      <div class="timer"> 
        <TimerComponent
          :restart="restart"
          :current-player="currentPlayer"
        />
      </div>
      <div class="board">
        <BoardComponent
          :board="(board as Board)"
          @update-board="refreshBoard"
          :currentPlayer="currentPlayer"
          :swapPlayer="swapPlayer"
        />
      </div>
      <div class="figure">
        <LostFigures 
          :title="Colors.BLACK"
          :figures="(board!.lostBlackFigures as Figure[])"
        />
        <LostFigures 
          :title="Colors.WHITE"
          :figures="(board!.lostWhiteFigures as Figure[])"
        />
      </div>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body{
  margin: 0;
  padding: 0;
  background: rgba(189, 162, 124, 1.0);
  background: linear-gradient(225deg, rgba(189, 162, 124, 1.0), rgba(26, 116, 173, 1.0));
}

.app {
  width: 100vw;
  height: 100vh;
  grid-template-columns: repeat(3, 1fr);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.timer {
  flex-basis: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  height: 512px;
}

.figure {
  flex-basis: 50%;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
