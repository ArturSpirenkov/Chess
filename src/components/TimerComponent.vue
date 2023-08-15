<script setup lang="ts">
import { Colors } from '@/models/Colors';
import type { Player } from '@/models/Player';
import { ref, watch } from 'vue';

interface TimerProps {
  currentPlayer: Player | null
  restart: () => void
}

const props = defineProps<TimerProps>()

const blackTime  = ref(300)
const whiteTime = ref(300) 
const timer = ref<null | ReturnType<typeof setInterval>>(null)

const decrementBlackTimer = () => {
  blackTime.value = blackTime.value - 1
}
const decrementWhiteTimer = () => {
  whiteTime.value = whiteTime.value - 1
}

const startTimer = () => {
  if (timer.value) {
    clearInterval(timer.value)
  }
  const callback = props.currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
  timer.value = setInterval(callback, 1000)
}

watch(() => props.currentPlayer, () => {
  console.log(props.currentPlayer)
  startTimer()
})

const handleRestart = () => {
  blackTime.value = 300
  whiteTime.value = 300
  props.restart()
}
</script>

<template>
  <div>
    <div>
      <button @click="handleRestart">Restart game</button>
    </div>
    <h2>Черные - {{blackTime}}</h2>
    <h2>Белые - {{whiteTime}}</h2>
  </div>
</template>

<style lang="scss">
</style>