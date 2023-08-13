<script setup lang="ts">
import { Cell } from '@/models/Cell';
import { ref } from 'vue'

interface Props {
  cell: Cell,
  isFocused: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  change: [cell: Cell]
}>()

const style = ref({
  cell: 'cell',
  color: props.cell.color,
})
</script>

<template>
  <div 
    :class="[style.cell, style.color, {selected: isFocused}]"  
    @click="emit('change', props.cell)" 
    :style="{background: props.cell.available && props.cell.figure ? 'green' : '' }"
  >
    <template v-if="props.cell.available && !props.cell.figure">
      <div class="available" />
    </template>
    <template v-if="props.cell.figure?.logo">
        <img :src="props.cell.figure?.logo">  
    </template>
  </div>
</template>

<style lang="scss">
  .cell {
    height: 64px;
    width: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
      width: 48px;
      height: 48px;
      position: relative;
    }
  }
  .white {
    background-color: rgb(120, 54, 123);
  }

  .black {
    background-color: rgb(0, 238, 238);
  }

  .selected {
    background-color: rgb(163, 41, 41);
  }

  .available {
    height: 12px;
    width: 12px;
    border-radius: 50%;
    background-color: rgb(55, 175, 55);
  }
</style>
