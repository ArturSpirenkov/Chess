<script setup lang="ts">
import { Colors } from '@/models/Colors';
import type { Player } from '@/models/Player';
import { ref, watch, computed } from 'vue';
import usePlayersTimer from '../hooks/usePlayersTimer';

interface TimerProps {
  currentPlayer: Player | null
  restart: () => void
}

const props = defineProps<TimerProps>()
const player = computed((): Player | null => props.currentPlayer)
const { whiteTime, blackTime, startTimer, restartTimer } = usePlayersTimer(player)

watch(() => props.currentPlayer, () => {
  startTimer()
})

const handleRestart = () => {
  restartTimer()
  props.restart()
}
</script>

<template>
  <div>
    <div>
      <button @click="handleRestart">Restart game</button>
    </div>
    <h2>Черные - {{ blackTime }}</h2>
    <h2>Белые - {{ whiteTime }}</h2>
  </div>
</template>
<style lang="scss">
</style>