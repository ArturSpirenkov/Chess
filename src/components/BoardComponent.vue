<script setup lang="ts">
import CellComponent from './CellComponent.vue';
import { Board } from '@/models/Board';
import { ref } from 'vue';
import { Cell } from '@/models/Cell';
import type { Player } from '@/models/Player';

const cellTarget = ref<null | Cell>(null)

interface BoardProps {
  board: Board 
  currentPlayer: Player | null
  swapPlayer: () => void
}

const props = defineProps<BoardProps>()
const emit = defineEmits<{
  updateBoard: [board: Board]
}>()

const selectCell = (cell: Cell): void => {
  if (cellTarget.value && cellTarget.value !== cell && cellTarget.value.figure?.canMove(cell)) {
    cellTarget.value.moveFigure(cell)
    cellTarget.value = null
    props.swapPlayer()
  } else {
    if (cell.figure?.color === props.currentPlayer?.color)
      cellTarget.value = cell
   }
}

const highlightCells = () => {
  props.board.highlightCells(cellTarget.value as Cell)
  return updateBoard()
}

const updateBoard = () => {
  emit('updateBoard', props.board.getCopyBoard())
}

const focusCell = (cell: Cell): boolean => {
  if (!cell.figure) {
    return false
  }
  return cellTarget.value?.x === cell.x && cellTarget.value?.y === cell.y
} 

</script>

<template>
  <!-- <h3> Current player  {{ currentPlayer?.color }}</h3> -->
  <div class="board">
    <template v-for="item in props.board!.cells">
      <CellComponent 
        @click="highlightCells"
        v-for="cell in item" 
        :key="cell.id" 
        :cell="cell" 
        :isFocused="focusCell(cell)"
        @change="selectCell"
      />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles';

  .board {
    user-select: none;
    box-sizing: content-box;
    border: solid 3px #4F7C8A;
    min-width: calc(64px * 8);
    max-width: calc(64px * 8);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    margin: 10px;
    box-shadow: 0px 0px 0px 10px #3B6674;
    z-index: 1;
    @include media("max", "sm") {
      min-width: calc(42px * 8);
      max-width: calc(42px * 8);
    }
    &::before {
      box-shadow: -3px 3px 5px #78ADCE;
      content: '';
      width: 100%;
      position: absolute;
      inset: 0;
      height: 100%;
      z-index: -10000
    }
    &::after {
      box-shadow: 3px -3px 5px #ad863c;
      content: '';
      width: 100%;
      position: absolute;
      inset: 0;
      z-index: -10000
    }
  }
</style>
