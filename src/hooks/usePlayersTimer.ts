import { Colors } from '@/models/Colors';
import type { Player } from '@/models/Player';
import { ref, type ComputedRef, computed, watch } from 'vue';


export default function usePlayersTimer(currentPlayer: ComputedRef<Player | null> , time = 300) {
  const blackSec  = ref(time)
  const whiteSec = ref(time)
  const timer = ref<null | ReturnType<typeof setInterval>>(null)

  const whiteTime = computed(() => ({
    sec: String( whiteSec.value  % 60).padStart(2, '0'),
    min: Math.floor(whiteSec.value / 60)
  }))

  const blackTime = computed(() => ({
    sec: String( blackSec.value  % 60).padStart(2, '0'),
    min: Math.floor(blackSec .value / 60)
  }))

  const decrementBlackTimer = () => {
    blackSec.value = blackSec.value - 1
  }
  const decrementWhiteTimer = () => {
    whiteSec.value = whiteSec.value - 1
  }
  const restartTimer = () => {
    blackSec.value = time
    whiteSec.value = time
  }
  const startTimer = () => {
    if (currentPlayer.value === null) {
      return
    }
    if (timer.value ) {
      clearInterval(timer.value)
    }
    const callback = currentPlayer.value.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
    timer.value = setInterval(callback, 1000)
  }
 
  return {
    startTimer,
    restartTimer,
    whiteTime,
    blackTime
  }
}
