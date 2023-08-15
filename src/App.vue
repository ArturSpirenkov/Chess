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
    <TimerComponent
      :restart="restart"
      :current-player="currentPlayer"
    />
    <BoardComponent
      :board="(board as Board)"
      @update-board="refreshBoard"
      :currentPlayer="currentPlayer"
      :swapPlayer="swapPlayer"
    />
    <div>
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
body{
  margin: 0;
  padding: 0;
}
.app {
  width: 100vw;
  height: 100vh;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
