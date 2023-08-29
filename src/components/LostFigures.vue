<script setup lang="ts">
import { Colors } from '@/models/Colors';
import type { Player } from '@/models/Player';
import type { Figure } from '@/models/figures/figure';

interface LostFiguresProps {
  title: string
  figures: Figure[]
  target: boolean
}

const props = defineProps<LostFiguresProps>()
</script>

<template>
  <div :class="['lost', { 'lost__target': target}]">
    <p>{{ title }}</p>
      <div v-for="figure in props.figures" :key="figure.id" class="lost__figure">
        <p>{{ figure.name }} </p>
        <img :src="figure.logo!"/> 
      </div>
  </div>
</template>

<style lang="scss" scoped> 
.lost {
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background-color: antiquewhite;
  height: 650px;
  justify-content: start;
  align-items: center;
  color: azure;
  background-color: #043d5a;;
  & p {
    margin: 5px;
    &::first-letter {
      text-transform: uppercase;
    }
  }
  &__figure {
    width: 100%;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
      height: 30px;
    }
  }
  &__target {
    background-color: #1B1B1B;  
    box-shadow: inset 0px 0px 20px 0px #2d9ad1;
  }
}
</style>
