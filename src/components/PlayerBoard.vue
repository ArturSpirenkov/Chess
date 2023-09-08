<script setup lang="ts">
import type { Player } from '@/models/Player'
import { watch, computed } from 'vue'
import usePlayersTimer from '../hooks/usePlayersTimer'
import { Colors } from '@/models/Colors'

interface PlayerBoardProps {
  currentPlayer: Player | null
  restart: () => void
}
function useLocalStorage<T>(key: string): T {
  let data = window.localStorage.getItem(key)
  return JSON.parse(data!)
}

const props = defineProps<PlayerBoardProps>()
const player = computed((): Player | null => props.currentPlayer)
const { startTimer, restartTimer, whiteTime, blackTime } = usePlayersTimer(player, useLocalStorage<number>('settings'))

watch(
  () => props.currentPlayer,
  () => {
    startTimer()
  }
)

const handleRestart = () => {
  restartTimer()
  props.restart()
}
</script>

<template>
  <div>
    <div class="player-board">
      <div
        :class="[
          'player-board__black-player',
          'black-player',
          { 'black-player_selected': currentPlayer?.color === Colors.BLACK },
        ]"
      >
        <span class="black-player__time">{{ `${blackTime.min} : ${blackTime.sec}` }}</span>
      </div>
      <div class="restart-time" @click="handleRestart">
        <button class="restart-time__btn">Restart game</button>
      </div>
      <div
        :class="[
          'player-board__white-player',
          'white-player',
          { 'white-player_selected': currentPlayer?.color === Colors.WHITE },
        ]"
      >
        <span class="white-player__time">{{ `${whiteTime.min} : ${whiteTime.sec}` }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@import '@/assets/styles';

.player-board {
  color: $color-white;
  height: 650px;
  width: 250px;
  display: flex;
  flex-direction: column;
  position: relative;
  font-size: 30px;
  @include media('max', 'lg') {
    flex-direction: row;
    height: 100px;
    width: 537px;
  }
  @include media('max', 'sm') {
    height: 50px;
    width: 360px;
    font-size: 20px;
  }

  &__white-player {
    @include player;
  }
  &__black-player {
    @include player;
  }
}
.restart-time {
  width: 70px;
  height: 70px;
  position: absolute;
  background-image: linear-gradient(to right top, #004763, #004e6d, #005576, #005c80, #01638a);
  top: calc(50% - 35px);
  left: calc(50% - 35px);
  rotate: 45deg;
  border-radius: 10px;
  box-shadow: 3px 3px 6px #7e8c93;
  cursor: pointer;
  @include media('max', 'sm') {
    height: 35px;
    width: 35px;
    top: calc(50% - 17.5px);
    left: calc(50% - 17.5px);
  }
  &__btn {
    background: none;
    border: none;
    height: 100%;
    rotate: -45deg;
    color: $color-white;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    @include media('max', 'sm') {
      font-size: 8px;
    }
  }
}
.white-player {
  &__time {
  }
  &_selected {
    @include player-selected;
  }
}
.black-player {
  &__time {
  }
  &_selected {
    @include player-selected;
  }
}
</style>
