<script setup lang="ts">
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
@import '@/assets/styles';

.lost {
  display: flex;
  flex-direction: column;
  height: 650px;
  width: 125px;
  justify-content: start;
  align-items: center;
  color: $color-white;
  background-color: $color-blue;
  @include media("max", "lg") {
    flex-direction: row;
    width: 100%;
    height: 100px;
    justify-content: center;
    align-items: center;
  }
  @include media("max", "sm") {
    height: 50px;
    font-size: 14px;
  }
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
      @include media("max", "lg") {
        height: 25px;
      }
      @include media("max", "sm") {
        height: 20px;
      }
    }
    @include media("max", "lg") {
      flex-direction: column;
      width: 40px;
      font-size: 12px;
      margin: 8px;
      justify-content: center;
      align-items: center;
    }
    @include media("max", "sm") {
      font-size: 8px;
      width: 15px;
    }
  }
  &__target {
    @include player-selected
  }
}
</style>
