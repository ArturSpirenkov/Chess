<script setup lang="ts">
import BoardComponent from './components/BoardComponent.vue';
import { Board } from './models/Board';
import { ref, onMounted}from 'vue';

const board = ref<Board | null>(new Board())

const restart = () => {
  const newBoard = new Board()
  newBoard.initCells()
  newBoard.addFigures()
  board.value = newBoard 
}
onMounted(() => {
  restart()
})

const refreshBoard = (e: Board) => {
  board.value = e
}
</script>

<template>
  <div class="app">
    <BoardComponent
      :board="board"
      @update-board="refreshBoard"/>
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
