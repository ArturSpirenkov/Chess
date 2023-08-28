import { Colors } from '@/models/Colors';
import type { Player } from '@/models/Player';
import { ref, type ComputedRef } from 'vue';


export default function usePlayersTimer(currentPlayer: ComputedRef<Player | null> , time = 300) {
  const blackTime  = ref(time)
  const whiteTime = ref(time)
  const timer = ref<null | ReturnType<typeof setInterval>>(null)
  
  const decrementBlackTimer = () => {
    blackTime.value = blackTime.value - 1
  }
  const decrementWhiteTimer = () => {
    whiteTime.value = whiteTime.value - 1
  }
  const restartTimer = () => {
    blackTime.value = time
    whiteTime.value = time
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
    whiteTime,
    blackTime,
    startTimer,
    restartTimer
  }
}