<script setup lang="ts">
import type { Figure } from '@/models/figures/figure';

interface LostFiguresProps {
  title: string
  figures: Figure[]
}

const props = defineProps<LostFiguresProps>()
</script>

<template>
  <div className="lost">
    <h3>{{ title }}</h3>
      <div v-for="figure in props.figures" :key="figure.id">
        {{ figure.name }} 
        <img style="width: 20px; height: 20px;" :src="figure.logo!"/> 
      </div>
  </div>
</template>

<style lang="scss"> 

</style>
