<script setup lang="ts">
import { Cell } from '@/models/Cell'
import { ref, computed } from 'vue'

interface CellProps {
  cell: Cell
  isFocused: boolean
}

const props = defineProps<CellProps>()
const emit = defineEmits<{
  change: [cell: Cell]
}>()

const style = ref({
  cell: 'cell',
  color: props.cell.color,
})

const axisNumbers = computed(() => {
  return props.cell.x == 0 ? true : false
})

const axisLetters = computed(() => {
  return props.cell.y == 7 ? true : false
})

const computedNumber = computed(() => {
  //checking the number of cells by Y in instance Board
  let numberСellsY = props.cell.board.cells.length
  return props.cell.x == 0 ? numberСellsY - props.cell.y : 1
})
const computedLetter = computed(() => {
  let charUTF = 97
  return props.cell.y == 7 ? String.fromCharCode(charUTF + props.cell.x) : null
})
</script>

<template>
  <div
    :class="[style.cell, style.color, { selected: isFocused }]"
    @click="emit('change', props.cell)"
    :style="{ background: props.cell.available && props.cell.figure ? '#9d9f10' : '' }"
  >
    <template v-if="props.cell.available && !props.cell.figure">
      <div class="available" />
    </template>
    <template v-if="props.cell.figure?.logo">
      <img :src="props.cell.figure?.logo" />
    </template>
    <template v-if="axisNumbers">
      <span class="cell__num">{{ computedNumber }}</span>
    </template>
    <template v-if="axisLetters">
      <span class="cell__letter">{{ computedLetter }}</span>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles';

.cell {
  height: 64px;
  width: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @include media('max', 'sm') {
    height: 42px;
    width: 42px;
  }
  & img {
    width: 48px;
    height: 48px;
    position: relative;
    @include media('max', 'sm') {
      width: 30px;
      height: 30px;
    }
  }
  &__num {
    position: absolute;
    top: 3px;
    left: 3px;
    @include media('max', 'sm') {
      right: 2px;
      bottom: 2px;
      font-size: 12px;
    }
  }
  &__letter {
    position: absolute;
    right: 3px;
    bottom: 3px;
    @include media('max', 'sm') {
      right: 2px;
      bottom: 2px;
      font-size: 12px;
    }
  }
}
.white {
  background-color: $cell-white;
  color: $cell-black;
}
.black {
  background-color: $cell-black;
  color: $cell-white;
}
.selected {
  background-color: $selected-cell;
}
.available {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: $available-cell;
}
</style>
