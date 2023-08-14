<script setup lang="ts">
import CellComponent from './CellComponent.vue';
import { Board } from '@/models/Board';
import { ref } from "vue";
import { Cell } from '@/models/Cell';
import type { Player } from '@/models/Player';

const cellTarget = ref<null | Cell>(null)

interface Props {
  board: Board 
  currentPlayer: Player | null
  swapPlayer: () => void
}

const props = defineProps<Props>()
const emit = defineEmits<{
  updateBoard: [board: Board]
}>()


const selectCell = (cell: Cell): void => {
  // can the selected figure move to selected cell
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
  <div>
    <h3> Current player  {{ currentPlayer?.color }}</h3>
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
  </div>
</template>

<style lang="scss">
  .board {
    width: calc(64px * 8);
    height: calc(64px * 8);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
</style>
