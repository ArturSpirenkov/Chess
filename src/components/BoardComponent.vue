<script setup lang="ts">
import CellComponent from './CellComponent.vue';
import { Board } from '@/models/Board';
import { ref } from "vue";
import { Cell } from '@/models/Cell';

const focus = ref(false)
const cellTarget = ref<null | Cell>()

interface Props {
  board: Board 
}

const props = defineProps<Props>()

const selectedCell = (cell: Cell) => {
  if(cell) {
    cellTarget.value = cell
  }
}
</script>

<template>
  <div class="board">
   <template v-for="item in props.board!.cells">
      <CellComponent 
        v-for="cell in item" 
        :key="cell.id" 
        :cell="cell" 
        :isFocused="cellTarget?.x === cell.x && cellTarget?.y === cell.y"
        @change="selectedCell"
      />
   </template>
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
