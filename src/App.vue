<script setup lang="ts">
import BoardComponent from './components/BoardComponent.vue'
import { Board } from './models/Board'
import { Player } from './models/Player'
import { Colors } from './models/Colors'
import { ref, onMounted}from 'vue'
import LostFigures from './components/LostFigures.vue'
import type { Figure } from './models/figures/figure'
import PlayerBoard from './components/PlayerBoard.vue'

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
    <PlayerBoard
      :restart="restart"
      :current-player="currentPlayer"
      class="players"
    />
    <div class="main-board">
      <BoardComponent
      :board="(board as Board)"
      @update-board="refreshBoard"
      :currentPlayer="currentPlayer"
      :swapPlayer="swapPlayer"
    />
    </div>
  <div class="figure-lost">
    <LostFigures 
      class="figure-lost__white"
      :target="currentPlayer?.color === Colors.WHITE ? true : false"
      :title="Colors.WHITE"
      :figures="(board!.lostWhiteFigures as Figure[])"
    />
    <LostFigures
      class="figure-lost__black"
      :target="currentPlayer?.color === Colors.BLACK ? true : false"
      :title="Colors.BLACK"
      :figures="(board!.lostBlackFigures as Figure[])"
    />
  </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/styles';

body{
  background: rgba(189, 162, 124, 1.0);
  background: linear-gradient(225deg, rgba(189, 162, 124, 1.0), rgba(26, 116, 173, 1.0));
}
.app {
  display: flex;
  @include media("max", "lg") {
    flex-direction: column;
  }
}
.main-board {
  background-color: azure;
  display: flex;
  justify-content: center;
  margin: 0.5vw;
}
.players {
  display: flex;
  border-radius: 10px;
  background-color: aqua;
  overflow: hidden;
}
.figure-lost {
  background-color: bisque;
  display: flex;
  border-radius: 10px;
  justify-content: start;
  overflow: hidden;
  align-items: center; 
  @include media("max", "lg") {
    min-width: 20%;
  }
  &__black {
    display: flex;
    justify-content: center;
  }
  &__white {
    display: flex;
    justify-content: center;
  }
}
</style>
